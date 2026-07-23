const prisma = require("../config/prisma");

const getDashboard = async () => {

    const [
        totalCustomers,
        totalProducts,
        totalChallans,
        lowStockProducts,
        recentChallans,
        recentInventory,
    ] = await Promise.all([

        prisma.customer.count(),

        prisma.product.count(),

        prisma.challan.count(),

        prisma.$queryRaw`
            SELECT COUNT(*)::int AS count
            FROM "Product"
            WHERE "currentStock" <= "minimumStock"
        `,

        prisma.challan.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: {
                    select: {
                        customerName: true,
                    },
                },
            },
        }),

        prisma.stockMovement.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                product: {
                    select: {
                        productName: true,
                    },
                },
            },
        }),

    ]);

    return {

        summary: {

            totalCustomers,

            totalProducts,

            totalChallans,

            lowStockProducts:
                lowStockProducts[0].count,

        },

        recentChallans,

        recentInventory,

    };

};

module.exports = {
    getDashboard,
};