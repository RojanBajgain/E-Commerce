const express = require("express");
const router = express.Router();
const { Cms } = require("../../controllers");

router.route("/").get(Cms.Staff.index).post(Cms.Staff.store);

router
  .route("/:id")
  .get(Cms.Staff.show)
  .put(Cms.Staff.update)
  .patch(Cms.Staff.update)
  .delete(Cms.Staff.destroy);

module.exports = router;
