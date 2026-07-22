const prisma = require("../config/prisma");

const createChallan = async (customerId, items, userId) => {

    return await prisma.$transaction(async (tx) => {

        // Check customer
        const customer = await tx.customer.findUnique({
            where: {
                id: customerId,
            },
        });

        if (!customer) {
            throw new Error("Customer not found");
        }

        let totalQuantity = 0;

        const challanItems = [];

        for (const item of items) {

            const product = await tx.product.findUnique({
                where: {
                    id: item.productId,
                },
            });

            if (!product) {
                throw new Error(
                    `Product ${item.productId} not found`
                );
            }

            if (product.currentStock < item.quantity) {
                throw new Error(
                    `${product.productName} has insufficient stock`
                );
            }

            totalQuantity += item.quantity;

            challanItems.push({
                productId: product.id,
                productName: product.productName,
                quantity: item.quantity,
                unitPrice: product.unitPrice,
            });
        }

        const challan = await tx.challan.create({
            data: {
                challanNumber: `CH-${Date.now()}`,
                customerId,
                totalQuantity,
                status: "PENDING",
                createdBy: userId,
            },
        });

        for (const item of challanItems) {

            await tx.challanItem.create({
                data: {
                    challanId: challan.id,
                    ...item,
                },
            });

            await tx.product.update({
                where: {
                    id: item.productId,
                },
                data: {
                    currentStock: {
                        decrement: item.quantity,
                    },
                },
            });

            await tx.stockMovement.create({
                data: {
                    productId: item.productId,
                    quantity: item.quantity,
                    movementType: "OUT",
                    reason: `Sales Challan ${challan.challanNumber}`,
                    createdBy: userId,
                },
            });

        }

        return challan;

    });

};
const getChallans = async () => {
    return await prisma.challan.findMany({
        include: {
            customer: {
                select: {
                    id: true,
                    customerName: true,
                    businessName: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getChallanById = async (id) => {
    return await prisma.challan.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            customer: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                },
            },
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
};
const updateChallanStatus = async (id, status) => {
    return await prisma.challan.update({
        where: {
            id: Number(id),
        },
        data: {
            status,
        },
    });
};
module.exports = {
    createChallan,
    getChallans,
    getChallanById,
    updateChallanStatus,
};