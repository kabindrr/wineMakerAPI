import express from "express";
import cors from "cors";

import { connectMongoDB } from "./src/database/mongoConfig.js";
import morgan from "morgan";
import routes from "./src/routes/router.js";

const app = express();
const PORT = 8020;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Mongoconnection
connectMongoDB();

//routes
routes.map(({ path, middlewawers }) => {
  app.use(
    path,
    middlewawers.map((item) => item)
  );
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server online",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log("Server not connected")
    : console.log(`server connected at ${PORT}`);
});
