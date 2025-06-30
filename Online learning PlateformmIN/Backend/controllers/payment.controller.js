import paymentModel from "../models/payment.model.js";
import userModel from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

// ✅ REMOVE Razorpay API key route
export const getRazorPayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "No Razorpay used",
      key: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ When user subscribes, just activate subscription immediately
export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login"));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 400));
    }

    user.subscription.id = "no-payment";
    user.subscription.status = "active";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription activated directly",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};




export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);

    if (user.role === "ADMIN") {
      return next(
        new AppError("Admin does not need to cancel subscription", 400)
      );
    }

    user.subscription.status = "cancelled";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};


