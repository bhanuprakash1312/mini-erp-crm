const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorise = require("../middleware/role.middleware")
const {
    createProduct,getProducts,getProductById, updateProduct,deleteProduct
} = require("../controllers/product.controller");

router.get(
    "/",
    authenticate,
    authorise(["ADMIN", "SALES", "WAREHOUSE"]),
    getProducts
);

router.post(
    "/",
    authenticate,
    authorise(["ADMIN", "WAREHOUSE"]),
    createProduct
);

router.put(
    "/:id",
    authenticate,
    authorise(["ADMIN", "WAREHOUSE"]),
    updateProduct
);

router.delete(
    "/:id",
    authenticate,
    authorise(["ADMIN"]),
    deleteProduct
);
module.exports = router;