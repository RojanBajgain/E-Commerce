const { Schema, model } = require("mongoose");
const Category = model(
  "Category",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = Category;
