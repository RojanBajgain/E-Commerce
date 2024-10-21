const { showError } = require("../../lib");
const { Order, OrderDetail } = require("../../models");

class OrderController {
  index = async (req, res, next) => {
    try {
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
      ]);
      let result = [];
      for (let order of orders) {
        let details = await OrderDetail.aggregate([
          { $match: { order_id: order._id } },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "product",
            },
          },
        ]);
        details = details.map(detail => {
          return {
            _id: detail._id,
            order_id: detail.order_id,
            product_id: detail.product_id,
            qty: detail.qty,
            price: detail.price,
            total: detail.total,
            product: detail.product[0],
          };
        });
        result.push({
          _id: order._id,
          user_id: order.user_id,
          status: order.status,
          user: order.user[0],
          details,
        });
      }
      res.json(result);
    } catch (error) {
      showError(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      const { status } = req.body;
      await Order.findByIdAndUpdate(req.params.id, { status });
      res.json({
        success: "Order updated",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({
        sucess: "Order deleted",
      });
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new OrderController();
