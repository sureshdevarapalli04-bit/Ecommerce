const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" }); // MUST be before imports
const connectDB = require("./config/db");
const cors = require("cors");
const notFound = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://ecommerce-one-sepia-99.vercel.app",
  credentials: true
}));
app.use(express.json());

// 🔹 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// 🔹 TEST API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// 🔹 ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
