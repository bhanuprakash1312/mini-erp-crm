const prisma = require("../config/prisma");
const createCustomer = async (req,res)=>{
    return await prisma.customer.create({
        data
    })
}
module.exports = {
    createCustomer
}