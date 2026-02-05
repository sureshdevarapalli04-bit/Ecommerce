const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, admin, (req, res) => {
  res.json({
    message: "Welcome Admin 👑",
    admin: req.user,
  });
});

module.exports = router;
