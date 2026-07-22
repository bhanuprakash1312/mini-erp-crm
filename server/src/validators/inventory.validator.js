const { z } = require("zod");

const inventorySchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    reason: z.string().min(2),
});

module.exports = inventorySchema;