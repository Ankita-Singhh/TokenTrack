const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");
const messRoutes = require("./routes/messRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const studentRoutes = require("./routes/studentRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const cors = require("cors");

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
const couponItemRoutes = require("./routes/couponItemRoutes");
app.use("/api/coupon-items", couponItemRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notices", noticeRoutes);

app.get("/", (req, res) => {
  res.send("TokenTrack API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});