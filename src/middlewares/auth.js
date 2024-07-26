import { getToken } from "../model/session/sessionModal.js";
import { getUser } from "../model/user/userModal.js";
import { verifyAccessJWT } from "../utils/jwt.js ";

export const auth = async (req, res, next) => {
  try {
    // 1 extract authorizatin from req.headers
    const { authorization } = req.headers;

    // 2. verify token
    const verified = verifyAccessJWT(authorization);

    //3. if verified, extract email and get token obj from session table using authorization
    if (verified?.email) {
      const tokenObj = await getToken(authorization);

      // 4. if tokenObj has id then using email get the user from userTable
      if (tokenObj?._id) {
        const user = await getUser({ email: verified?.email });

        if (user?._id) {
          user.password = undefined;
          user.__v = undefined;
          user.refreshJWT = undefined;
          req.userInfo = user;

          //next middlewares
          return next();
        }
      }
    }

    //if error
    res.json({
      status: "error",
      message: "Authentication error",
    });
  } catch (error) {
    console.log("error from Auth", error);
    res.json({
      status: "error",
      message: error,
    });
  }
};
