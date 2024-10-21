const express = require("express");
const router = express.Router();
const { Cms } = require("../../controllers");

router.route("/").get(Cms.Category.index).post(Cms.Category.store);

router
  .route("/:id")
  .get(Cms.Category.show)
  .put(Cms.Category.update)
  .patch(Cms.Category.update)
  .delete(Cms.Category.destroy);

module.exports = router;
