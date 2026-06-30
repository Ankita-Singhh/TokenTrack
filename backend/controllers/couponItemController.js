const CouponItem = require("../models/CouponItem");
const Mess = require("../models/Mess");

const createCouponItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const messId = req.user.managedMess;

    const mess = await Mess.findById(messId);

    if (!mess) {
      return res.status(404).json({
        message: "Mess not found",
      });
    }

    const existingItem = await CouponItem.findOne({
      name,
      mess: messId,
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Item already exists in this mess",
      });
    }

    const item = await CouponItem.create({
      name,
      price,
      mess: messId,
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCouponItem,
};