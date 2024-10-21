const { Schema, model } = require("mongoose");

const Order = model(
  "Order",
  new Schema(
    {
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      status: {
        type: String,
        enum: ["Processing", "Confirmed", "Shipping", "Delivered"],
        default: "Processing",
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = Order;
