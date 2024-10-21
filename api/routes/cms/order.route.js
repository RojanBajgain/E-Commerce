const express = require("express");
const router = express.Router();
const { Cms } = require("../../controllers");

router.route("/").get(Cms.Order.index);

router
  .route("/:id")
  .put(Cms.Order.update)
  .patch(Cms.Order.update)
  .delete(Cms.Order.destroy);

module.exports = router;
