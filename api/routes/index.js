const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth/auth.routes");
const CmsRoutes = require("./cms");
const FrontRoutes = require("./front");
const ProfileRoutes = require("./profile/profile.route");
const { auth, cms, customerOnly } = require("../middleware");
const { Profile } = require("../controllers");

router.use("/auth", AuthRoutes);
router.use("/cms", auth, cms, CmsRoutes);
router.use("/profile", auth, ProfileRoutes);
router.use(FrontRoutes);

router.get("/image/:filename", (req, res, next) => {
  res.sendFile(`uploads/${req.params.filename}`, {
    root: "./",
  });
});

router.post("/checkout", auth, customerOnly, Profile.checkout);

router.use((req, res, next) => {
  next({
    status: 404,
    message: "Resource not found",
  });
});

module.exports = router;
