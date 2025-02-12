import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({
    title: "GET all users",
  });
});

userRouter.get("/:id", (req, res) => {
  res.send({
    title: "GET user details by id",
  });
});
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
