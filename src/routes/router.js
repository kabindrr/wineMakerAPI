import userRouter from "./userRouter.js";

const routes = [
  {
    path: "/api/v1/users",
    middlewawers: [userRouter],
  },
];
export default routes;
