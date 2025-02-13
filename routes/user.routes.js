import { Router } from "express";
import { getUser, getUSers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUSers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({
    title: "CREATE new user",
  });
});
userRouter.post("/:id", (req, res) => {
  res.send({
    title: "UPDATE user",
  });
});
userRouter.post("/:id", (req, res) => {
  res.send({
    title: "DELETE user",
  });
});

export default userRouter;
