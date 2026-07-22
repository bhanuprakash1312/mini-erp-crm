const { z } = require("zod");

const challanSchema = z.object({
    customerId: z.number().int().positive(),

    items: z.array(
        z.object({
            productId: z.number().int().positive(),
            quantity: z.number().int().positive(),
        })
    ).min(1),
});

module.exports = challanSchema;