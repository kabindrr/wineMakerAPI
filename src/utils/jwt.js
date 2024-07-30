import JWT from "jsonwebtoken";
import { addToken } from "../model/session/sessionModal.js";
import { updateUser } from "../model/user/userModal.js";

const Access_Secret_Key = "qwertyuiopsdfghjklzxcvbnm";
const Refresh_Secret_Key = "asdfghjklqwertyuiopzxc";

//for access JWT
export const signAccessJWT = (email) => {
  const token = JWT.sign({ email }, Access_Secret_Key, { expiresIn: "20m" });
  addToken({ token });
  return token;
};

//verify access JWT
export const verifyAccessJWT = (token) => {
  try {
    return JWT.verify(token, Access_Secret_Key);
  } catch (error) {
    return error;
  }
};

//for Refresh JWT
export const signRefreshJWT = (email) => {
  const refreshJWT = JWT.sign({ email }, Refresh_Secret_Key, {
    expiresIn: "30d",
  });
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};
//verify Refresh JWT
export const verifyRefreshJWT = (token) => {
  JWT.verify(token, Access_Secret_Key);
};
