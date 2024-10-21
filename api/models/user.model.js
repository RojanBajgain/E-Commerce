const { Schema, model } = require("mongoose");

const User = model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        maxLength: 30,
      },
      status: {
        type: Boolean,
        default: true,
      },
      address: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["Admin", "Staff", "Customer"],
        default: "Customer",
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = User;
