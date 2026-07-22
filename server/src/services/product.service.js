const prisma = require("../config/prisma");

const createProduct = async (data) => {
    return await prisma.product.create({
        data,
    });
};
const getProducts = async () => {
    return await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getProductById = async (id) => {
    return await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    });
};
const updateProduct = async (id, data) => {
    return await prisma.product.update({
        where: {
            id: Number(id),
        },
        data,
    });
};
const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });
};
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};