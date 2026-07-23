const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorise = require("../middleware/role.middleware")
const {createCustomer,getCustomers,getCustomerById,updateCustomer,deleteCustomer} = require("../controllers/customer.controller");
router.get(
    "/",
    authenticate,
    authorise(["ADMIN", "SALES", "ACCOUNTS"]),
    getCustomers
);

router.post(
    "/",
    authenticate,
    authorise(["ADMIN", "SALES"]),
    createCustomer
);

router.put(
    "/:id",
    authenticate,
    authorise(["ADMIN", "SALES"]),
    updateCustomer
);

router.delete(
    "/:id",
    authenticate,
    authorise(["ADMIN"]),
    deleteCustomer
);
module.exports = router;