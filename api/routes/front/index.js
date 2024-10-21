const express = require("express");
const router = express.Router();
const productRoute = require("./product.route");
const listRoute = require("./list.route");

router.use("/product", productRoute);
router.use(listRoute);

module.exports = router;
