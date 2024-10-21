const { showError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  register = async (req, res, next) => {
    try {
      const { name, email, password, confirm_password, phone, address } =
        req.body;
      if (await User.findOne({ email })) {
        next({
          status: 422,
          message: `Email Aleady Exist`,
        });
      } else {
        if (password === confirm_password) {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          await User.create({ name, address, email, phone, password: hash });
          res.json({
            success: `Thank you for registering plz login to continue`,
          });
        } else {
          next({
            status: 422,
            message: `Password doesnot match`,
          });
        }
      }
    } catch (error) {
      showError(error, next);
    }
  };
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              id: user._id,
              iat: Math.floor(Date.now() / 1000) - 30,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            },
            process.env.JWT_SECRET
          );
          res.json({ token, user });
        } else {
          next({
            status: 422,
            message: `Password isn't correct`,
          });
        }
      } else {
        next({
          status: 422,
          message: `Email didn't found`,
        });
      }
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new AuthController();
