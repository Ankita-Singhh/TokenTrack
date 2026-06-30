// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET
//       );

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } else {
//       return res.status(401).json({
//         message: "Not authorized",
//       });
//     }
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };

// module.exports = protect;



const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      req.user = await User.findById(decoded.id).select("-password");

      //===========test
      console.log("Authenticated User:", req.user?.email, req.user?.role);

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    console.log("Protect Error:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = protect;