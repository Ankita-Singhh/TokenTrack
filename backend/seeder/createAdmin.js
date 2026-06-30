const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "tokentrack",
    });

    const existingAdmin = await User.findOne({
      email: "admin@tokentrack.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await User.create({
      name: "Super Admin",
      email: "admin@tokentrack.com",
      password: hashedPassword,
      role: "admin",
      isApproved: true,
      status: "approved",
    });

    console.log("Admin Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();