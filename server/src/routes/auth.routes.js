const express = require("express");

const router = express.Router();

const {register,login,profile} = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.post("/register",authenticate,authorize("ADMIN"),register);
router.post("/login",login);
router.get(
    "/profile",authenticate,profile
)
router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin"
    });
  }
);

module.exports = router;