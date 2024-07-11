import express from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { addUser, getUser } from "../model/user/userModal.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";

const userRouter = express.Router();

//Register
userRouter.post("/register", async (req, res) => {
  req.body.password = hashPassword(req.body.password);

  const result = await addUser(req.body);

  result?._id
    ? res.json({
        status: "success",
        message: "Registration successful",
      })
    : res.json({
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
