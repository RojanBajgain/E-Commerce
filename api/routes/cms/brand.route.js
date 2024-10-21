const express = require("express");
const router = express.Router();
const { Cms } = require("../../controllers");

router.route("/").get(Cms.Brand.index).post(Cms.Brand.store);

router
  .route("/:id")
  .get(Cms.Brand.show)
  .put(Cms.Brand.update)
  .patch(Cms.Brand.update)
  .delete(Cms.Brand.destroy);

module.exports = router;
