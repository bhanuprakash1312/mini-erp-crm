const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorise = require("../middleware/role.middleware")
const {
    stockIn,stockOut,getInventoryHistory, getLowStockProducts
} = require("../controllers/inventory.controller");

router.post(
    "/stock-in",
    authenticate,
    authorise(["ADMIN", "WAREHOUSE"]),
    stockIn
);

router.post(
    "/stock-out",
    authenticate,
    authorise(["ADMIN", "WAREHOUSE"]),
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