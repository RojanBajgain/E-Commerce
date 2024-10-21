const express = require("express");
const { Cms } = require("../../controllers");
const router = express.Router();

router.route("/").get(Cms.Review.index);
router.route("/:id").delete(Cms.Review.destroy);

module.exports = router;
