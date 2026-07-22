const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const {createCustomer,getCustomers,getCustomerById,updateCustomer,deleteCustomer} = require("../controllers/customer.controller");
router.post("/", authenticate, createCustomer); 
router.get("/", authenticate, getCustomers);
router.get("/:id", authenticate, getCustomerById);
router.put(
    "/:id",
    authenticate,
    updateCustomer
);
router.delete("/:id", authenticate, deleteCustomer);
module.exports = router;