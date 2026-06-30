const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isManager = require("../middleware/managerMiddleware");
const {
    deductCoupons,
    getAllTransactions,
    undoTransaction,
} = require("../controllers/transactionController");

router.put(
  "/undo/:transactionId",
  protect,
  isManager,
  undoTransaction
);

router.post(
  "/deduct",
  protect,
  isManager,
  deductCoupons
);

router.get(
  "/all",
  protect,
  isManager,
  getAllTransactions
);



module.exports = router;