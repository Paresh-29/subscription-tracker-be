import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "subscription price is required"],
      min: [0, "price should be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["sports", "music", "news", "entertainment", "finance", "politics"],
      required: [true, "category is required"],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "start date should be in the past",
      },
    },

    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function(value) {
          return value > this.startDate;
        },
        message: "renewal date should be greater than start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// auto set renewal date
subscriptionSchema.pre("save", function(next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.startDate.getDate() + renewalPeriod[this.frequency],
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
