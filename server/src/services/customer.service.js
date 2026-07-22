const prisma = require("../config/prisma");
const createCustomer = async (data)=>{
    return await prisma.customer.create({
        data
    })
}
const getCustomers = async (page, limit, search) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            customerName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            businessName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            mobile: {
              contains: search,
            },
          },
        ],
      }
    : {};

  const customers = await prisma.customer.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.customer.count({
    where,
  });

  return {
    customers,
    total,
  };
};
const getCustomerById = async (id) => {
    return await prisma.customer.findUnique({
        where: {
            id: Number(id),
        },
    });
};
const updateCustomer = async (id, data) => {
    return await prisma.customer.update({
        where: {
            id: Number(id),
        },
        data,
    });
};
const deleteCustomer = async (id) => {
    return await prisma.customer.delete({
        where: {
            id: Number(id),
        },
    });
};

module.exports = {
  createCustomer,
  getCustomers,
    updateCustomer,
  getCustomerById,
    deleteCustomer,
};
