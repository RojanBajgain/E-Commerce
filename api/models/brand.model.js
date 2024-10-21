const { Schema, model } = require("mongoose");
const Brand = model(
  "Brand",
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

module.exports = Brand;
