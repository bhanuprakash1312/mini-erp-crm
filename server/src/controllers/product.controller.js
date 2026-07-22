const productSchema = require("../validators/product.validator");
const productService = require("../services/product.service");

const createProduct = async (req, res) => {
    try {
        const validatedData = productSchema.parse(req.body);

        const product = await productService.createProduct(validatedData);

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {

        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const validatedData = productSchema.parse(req.body);

        const existingProduct = await productService.getProductById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const updatedProduct = await productService.updateProduct(
            id,
            validatedData
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {

        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await productService.getProductById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await productService.deleteProduct(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};