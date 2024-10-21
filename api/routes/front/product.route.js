const express = require("express");
const router = express.Router();
const { Front } = require("../../controllers");
const { Profile } = require("../../controllers");
const { auth, customerOnly } = require("../../middleware");

router.get("/featured", Front.Product.featured);
router.get("/latest", Front.Product.latest);
router.get("/top-selling", Front.Product.topSelling);
router.get("/:id", Front.Product.byId);
router.get("/:id/similar", Front.Product.similar);
router.post("/:id/review", auth, customerOnly, Profile.addreview);

module.exports = router;
