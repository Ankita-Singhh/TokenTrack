const isAdmin = (req, res, next) => {
//==========test
      console.log("User Role:", req.user?.role);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }

  next();
};

module.exports = isAdmin;