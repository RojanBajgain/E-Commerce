const jwt = require("jsonwebtoken");
const { User } = require("../models");
const multer = require("multer");

const auth = async (req, res, next) => {
  if ("authorization" in req.headers) {
    const token = req.headers.authorization.split(" ").pop();
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const uid = decoded.id;
      const user = await User.findById(uid);
      if (user) {
        (req.uid = uid), (req.user = user);
        next();
      } else {
        next({
          status: 401,
          message: "Token invalid",
        });
      }
    } catch (error) {
      next({
        message: "Token invalid",
        status: 401,
      });
    }
  } else {
    next({
      status: 401,
      message: `Token Missing`,
    });
  }
};

const cms = (req, res, next) => {
  if (req.user.type !== "Customer") {
    next();
  } else {
    next({
      status: 403,
      message: "Access denied",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.type === "Admin") {
    next();
  } else {
    next({
      status: 403,
      message: "Access Denied",
    });
  }
};

const customerOnly = (req, res, next) => {
  if (req.user.type === "Customer") {
    next();
  } else {
    next({
      status: 403,
      message: "Access Denied",
    });
  }
};

const fileUpload = (mimeTypes = []) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => callback(null, "uploads"),
      filename: (req, file, callback) => {
        const ext = file.originalname.split(".").pop();
        const filename =
          Date.now() + `${Math.floor(Math.random() * 100) + 1}` + `.${ext}`;
        callback(null, filename);
      },
    }),

    fileFilter: (req, file, callback) => {
      if (mimeTypes.length > 0) {
        if (mimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback({ message: "File type not supported" }, false);
        }
      } else {
        callback(null, true);
      }
    },
  });

module.exports = { auth, cms, adminOnly, fileUpload, customerOnly };
