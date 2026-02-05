const Order = require("../models/Order");
const Cart = require("../models/Cart");
const razorpay = require("../config/razorpay");

// @desc    Place order
// @route   POST /api/orders
// @access  User
const placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price"
    );
    

    if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    // Calculate total
    let totalAmount = 0;
    orderItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      totalAmount,
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};


// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  User
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.orderStatus = status || order.orderStatus;

    // Optional: auto update payment status
    if (status === "Delivered") {
      order.paymentStatus = "Completed";
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm COD payment
// @route   PUT /api/orders/:id/pay/cod
// @access  User
const confirmCODPayment = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    if (order.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to access this order");
    }

    order.paymentMethod = "COD";
    order.paymentStatus = "Pending";

    const updatedOrder = await order.save();

    res.json({
      message: "Cash on Delivery confirmed",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};



// @desc    Create Razorpay order
// @route   POST /api/orders/:id/pay/online
// @access  User
const createOnlinePayment = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    if (order.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100, // ₹ to paise
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  confirmCODPayment,
  createOnlinePayment,
};



