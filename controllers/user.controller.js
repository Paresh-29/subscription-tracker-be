import User from "../models/user.model.js";

export const getUSers = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true}
    );

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
   const user = await User.findByIdAndDelete(req.params.id);

   if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
   }

   res.status(200).json({
    success: true,
    message: "User deleted successfully",
   })
  } catch (error) {
    next(error);
  }
}
