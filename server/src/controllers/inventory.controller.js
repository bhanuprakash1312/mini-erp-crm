const inventorySchema = require("../validators/inventory.validator");
const inventoryService = require("../services/inventory.service");

const stockIn = async (req, res) => {
    try {
        const { productId, quantity, reason } =
            inventorySchema.parse(req.body);

        const product = await inventoryService.stockIn(
            productId,
            quantity,
            reason,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Stock added successfully",
            data: product,
        });

    } catch (error) {

    if (error.name === "ZodError") {
        return res.status(400).json({
            success: false,
            errors: error.errors,
        });
    }

    if (error.message === "Product not found") {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }

    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}
};
const stockOut = async (req, res) => {
    try {

        const { productId, quantity, reason } =
            inventorySchema.parse(req.body);

        const product = await inventoryService.stockOut(
            productId,
            quantity,
            reason,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Stock removed successfully",
            data: product,
        });

    } catch (error) {

        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }

        if (
            error.message === "Product not found" ||
            error.message === "Insufficient stock"
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getInventoryHistory = async (req, res) => {
    try {
        const history = await inventoryService.getInventoryHistory();

        return res.status(200).json({
            success: true,
            count: history.length,
            data: history,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getLowStockProducts = async (req, res) => {
    try {
        const products = await inventoryService.getLowStockProducts();

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
module.exports = {
    stockIn,
    stockOut,
    getInventoryHistory,
    getLowStockProducts,
};