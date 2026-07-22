const prisma = require("../config/prisma");

const stockIn = async (productId, quantity, reason, userId) => {
    return await prisma.$transaction(async (tx) => {

        // Check product exists
        const existingProduct = await tx.product.findUnique({
            where: {
                id: Number(productId),
            },
        });

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Increase stock
        const updatedProduct = await tx.product.update({
            where: {
                id: Number(productId),
            },
            data: {
                currentStock: {
                    increment: quantity,
                },
            },
        });

        // Create movement history
        await tx.stockMovement.create({
            data: {
                productId: Number(productId),
                quantity,
                movementType: "IN",
                reason,
                createdBy: userId,
            },
        });

        return updatedProduct;
    });
};
const stockOut = async (productId, quantity, reason, userId) => {
    return await prisma.$transaction(async (tx) => {

        const product = await tx.product.findUnique({
            where: {
                id: Number(productId),
            },
        });

        if (!product) {
            throw new Error("Product not found");
        }

        if (product.currentStock < quantity) {
            throw new Error("Insufficient stock");
        }

        const updatedProduct = await tx.product.update({
            where: {
                id: Number(productId),
            },
            data: {
                currentStock: {
                    decrement: quantity,
                },
            },
        });

        await tx.stockMovement.create({
            data: {
                productId: Number(productId),
                quantity,
                movementType: "OUT",
                reason,
                createdBy: userId,
            },
        });

        return updatedProduct;
    });
};
const getInventoryHistory = async () => {
    return await prisma.stockMovement.findMany({
        include: {
            product: {
                select: {
                    id: true,
                    productName: true,
                    sku: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getLowStockProducts = async () => {
    return await prisma.$queryRaw`
        SELECT *
        FROM "Product"
        WHERE "currentStock" <= "minimumStock"
        ORDER BY "currentStock" ASC
    `;
};
module.exports = {
    stockIn,
    stockOut,
    getInventoryHistory,
    getLowStockProducts,
};