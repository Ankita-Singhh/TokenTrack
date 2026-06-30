const MessSettings = require("../models/MessSettings");

const createOrUpdateSettings = async (req, res) => {
  try {
    const {
      messId,
      couponsPerSemester,
      couponValue,
      lowBalanceAlert,
    } = req.body;

    let settings = await MessSettings.findOne({
      mess: messId,
    });

    if (settings) {
      settings.couponsPerSemester = couponsPerSemester;
      settings.couponValue = couponValue;
      settings.lowBalanceAlert = lowBalanceAlert;

      await settings.save();

      return res.status(200).json({
        message: "Settings updated successfully",
        settings,
      });
    }

    settings = await MessSettings.create({
      mess: messId,
      couponsPerSemester,
      couponValue,
      lowBalanceAlert,
    });

    res.status(201).json({
      message: "Settings created successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrUpdateSettings,
};