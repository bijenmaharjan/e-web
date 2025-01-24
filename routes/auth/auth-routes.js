const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  authMiddleware,
} = require("../../controllers/auth/auth-controllers");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated", user });
});

module.exports = router;
