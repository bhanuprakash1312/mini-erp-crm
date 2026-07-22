const { z } = require("zod");

const productSchema = z.object({
    productName: z.string().min(2),
    sku: z.string().min(2),
    category: z.string().min(2),
    unitPrice: z.number().positive(),
    currentStock: z.number().int().min(0),
    minimumStock: z.number().int().min(0),
    warehouse: z.string().min(2),
});

module.exports = productSchema;