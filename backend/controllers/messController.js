const Mess = require("../models/Mess");

const createMess = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
  return res.status(400).json({
    message: "Mess name is required",
  });
}

    const existingMess = await Mess.findOne({ name: name.trim() });

    if (existingMess) {
      return res.status(400).json({
        message: "Mess already exists",
      });
    }

    const mess = await Mess.create({
      name: name.trim(),
    });

    res.status(201).json({
      message: "Mess created successfully",
      mess,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllMesses = async (req, res) => {
  try {
    const messes = await Mess.find();

    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMess,
  getAllMesses,
};