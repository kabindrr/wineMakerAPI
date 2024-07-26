import express from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { addUser, getUser, updateUser } from "../model/user/userModal.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { emailVerification } from "../utils/nodemailer.js";
import {
  addToken,
  deleteToken,
  getToken,
} from "../model/session/sessionModal.js";
import { auth } from "../middlewares/auth.js";
import { token } from "morgan";

const userRouter = express.Router();

//Register
userRouter.post("/register", async (req, res, next) => {
  req.body.password = hashPassword(req.body.password);

  const result = await addUser(req.body);

  if (result?._id) {
    const uniqueKey = uuidv4();

    //email verification email generator
    await emailVerification(result?.email, result?.fName, uniqueKey);

    //save unique key as token and email as associate in session table which will be used to verify email

    await addToken({ token: uniqueKey, associate: result?.email });

    return res.json({
      status: "success",
      message: "Check email to verify account",
    });
  }

  res.json({
    status: "error",
    message: "Registration failed",
  });
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUser({ email });
  if (user?._id) {
    const isPasswordCorrect = comparePassword(password, user.password);

    return isPasswordCorrect
      ? res.json({
          status: "success",
          message: "login successful",

          //send tokens
          tokens: {
            accessJWT: signAccessJWT(email),
            refreshJWT: signRefreshJWT(email),
          },
        })
      : res.json({
          status: "error",
          message: "password do not match",
        });
  }

  res.json({ status: "error", message: "user doesnot exits" });
});

//get user profile
userRouter.get("/user-profile", auth, (req, res, next) => {
  try {
    const user = userInfo;

    return res.json({
      status: "success",
      message: "user Profile found",
      user,
    });
  } catch (error) {
    console.log("user Profile not found: ", error);

    res.json({
      status: "error",
      message: error.message,
    });
  }
});

userRouter.post("/verify-email", async (req, res, next) => {
  try {
    //get unique key and email from req.body
    const { ukey, e } = req.body;

    //check if token is present with same unique key as token and email as associate
    const tokenInSessionTable = await getToken({ token: ukey, associate: e });
    if (tokenInSessionTable?._id) {
      const updatedUser = await updateUser(
        { email: e },
        { isEmailVerified: true }
      );

      //delete token from table
      if (updatedUser?._id) {
        await deleteToken(tokenInSessionTable._id);

        //response back to frontend
        return res.json({
          status: "success",
          message: "Email verified,Login Now",
        });
      }
    }

    //if error in verifying token
    res.json({
      status: "error",
      message: "Error in verifying token",
    });
  } catch (error) {
    console.log("user Email verify error: ", error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default userRouter;
