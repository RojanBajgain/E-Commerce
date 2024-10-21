const express = require("express");
const router = express.Router();
const { Profile } = require("../../controllers");
const { auth, customerOnly } = require("../../middleware");

router.get("/detail", Profile.detail);
router.route("/edit-profile").put(Profile.edit).patch(Profile.edit);
router.route("/change-password").put(Profile.password).patch(Profile.password);
router.get("/reviews", auth, customerOnly, Profile.reviews);
router.get("/orders", auth, customerOnly, Profile.order);

module.exports = router;
