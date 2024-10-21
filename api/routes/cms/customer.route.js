const express = require("express");
const router = express.Router();
const { Cms } = require("../../controllers");

router.route("/").get(Cms.Customer.index).post(Cms.Customer.store);

router
  .route("/:id")
  .get(Cms.Customer.show)
  .put(Cms.Customer.update)
  .patch(Cms.Customer.update)
  .delete(Cms.Customer.destroy);

module.exports = router;
