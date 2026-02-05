const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Add product to cart
// @route   POST /api/cart
// @access  User
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400);
      throw new Error("Product ID and quantity are required");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  User
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product", "name price images");

    if (!cart) {
      return res.json({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    let totalPrice = 0;
    let totalItems = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.quantity * item.product.price;
    });

    res.json({
      _id: cart._id,
      items: cart.items,
      totalItems,
      totalPrice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart
// @access  User
const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      res.status(400);
      throw new Error("Product ID and valid quantity are required");
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      res.status(404);
      throw new Error("Product not found in cart");
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  User
const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      res.status(404);
      throw new Error("Product not found in cart");
    }

    await cart.save();

    res.json({
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
};



