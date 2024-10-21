const { showError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

class StaffController {
  index = async (req, res, next) => {
    try {
      const staffs = await User.find({ type: "Staff" });
      res.json(staffs);
    } catch (error) {
      showError(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const {
        name,
        address,
        phone,
        email,
        password,
        confirm_password,
        status,
      } = req.body;
      if (await User.findOne({ email })) {
        next({
          status: 400,
          message: "Email Already Exist",
        });
      } else {
        if (password === confirm_password) {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          await User.create({
            name,
            address,
            phone,
            email,
            password: hash,
            status,
            type: "Staff",
          });
          res.json({
            success: `Staff created`,
          });
        } else {
          next({
            status: 409,
            message: `Password doesnot match`,
          });
        }
      }
    } catch (error) {
      showError(error, next);
    }
  };

  show = async (req, res, next) => {
    const staff = await User.findById(req.params.id);
    res.json(staff);
    try {
    } catch (error) {
      showError(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name, address, phone, status } = req.body;
      await User.findByIdAndUpdate(req.params.id, {
        name,
        address,
        phone,
        status,
      });
      res.json({
        success: `Staff Updated`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.json({
        success : 'staff removed'
      })
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new StaffController();
