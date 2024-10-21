const express = require("express");
const router = express.Router();
const staffRoute = require("./staff.route");
const brandRoute = require("./brand.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const orderRoute = require("./order.route");
const reviewRoute = require("./review.route");
const customerRoute = require("./customer.route");
const { adminOnly } = require("../../middleware");

router.use("/staffs", adminOnly, staffRoute);
router.use("/brands", brandRoute);
router.use("/categories", categoryRoute);
router.use("/orders", orderRoute);
router.use("/customers", customerRoute);
router.use("/reviews", reviewRoute);

router.use("/products", productRoute);

module.exports = router;
