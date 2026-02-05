const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  confirmCODPayment,
  createOnlinePayment, 
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// User routes
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.put("/:id/pay/cod", protect, confirmCODPayment);
router.post("/:id/pay/online", protect, createOnlinePayment);

// Admin routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
