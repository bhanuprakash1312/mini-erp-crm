const prisma = require("../config/prisma");

const createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};

const getProducts = async (page, limit, search) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            productName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            sku: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            warehouse: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
  };
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