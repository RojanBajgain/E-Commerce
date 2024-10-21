const { Schema, model } = require("mongoose");

const Review = model(
  "Review",
  new Schema(
    {
      product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = Review;
