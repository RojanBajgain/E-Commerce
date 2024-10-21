const express = require("express");
const router = express.Router();
const { Cms } = require("../../controllers");
const { fileUpload } = require("../../middleware");

router
  .route("/")
  .get(Cms.Product.index)
  .post(
    fileUpload(["image/jpeg", "image/jpg", "image/png", "image/gif"]).array(
      "images"
    ),
    Cms.Product.store
  );

router
  .route("/:id")
  .get(Cms.Product.show)
  .put(
    fileUpload(["image/jpg", "image/jpeg", "image/png", "image/gif"]).array(
      "images"
    ),
    Cms.Product.update
  )
  .patch(
    fileUpload(["image/jpeg", "image/jpg", "image/gif", "image/png"]).array(
      "images"
    ),
    Cms.Product.update
  )
  .delete(Cms.Product.destroy);

router.route("/:id/image/:filename").delete(Cms.Product.images);

module.exports = router;
