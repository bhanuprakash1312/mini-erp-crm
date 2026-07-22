const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
    createProduct,getProducts,getProductById, updateProduct,deleteProduct
} = require("../controllers/product.controller");

router.post(
    "/",
    authenticate,
    createProduct
);
router.get("/",
    authenticate,
    getProducts
);
router.get("/:id",
    authenticate,
    getProductById
);
router.put("/:id",
    authenticate,
    updateProduct
);
router.delete("/:id",
    authenticate,
    deleteProduct
);
module.exports = router;