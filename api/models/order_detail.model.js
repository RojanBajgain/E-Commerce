const { Schema, model } = require("mongoose");

const OrderDetail = model(
  "OrderDetail",
  new Schema(
    {
      order_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "orders",
      },
      product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = OrderDetail;
