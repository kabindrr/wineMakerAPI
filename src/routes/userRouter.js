import express from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { addUser, getUser } from "../model/user/userModal.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { emailVerification } from "../utils/nodemailer.js";
import { addToken } from "../model/session/sessionModal.js";
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

    await addToken({ token: uniqueKey, associate });

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

export default userRouter;
