const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
    stockIn,stockOut,getInventoryHistory, getLowStockProducts
} = require("../controllers/inventory.controller");

router.post(
    "/stock-in",
    authenticate,
    stockIn
);
router.post(
    "/stock-out",
    authenticate,
    stockOut
);
router.get(
    "/history",
    authenticate,
    getInventoryHistory
);
router.get(
    "/low-stock",
    authenticate,
    getLowStockProducts
);

module.exports = router;