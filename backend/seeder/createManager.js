const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const createManager = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "tokentrack",
    });

    const existingManager = await User.findOne({
      email: "manager@tokentrack.com",
    });

    if (existingManager) {
      console.log("Manager already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "manager123",
      10
    );

    await User.create({
      name: "Primary Manager",
      email: "manager@tokentrack.com",
      password: hashedPassword,
      role: "manager",
      isApproved: true,
      status: "approved",
    });

    console.log("Manager Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createManager();