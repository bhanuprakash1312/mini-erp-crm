const { z } = require("zod");

const challanStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "DELIVERED",
        "CANCELLED",
    ]),
});

module.exports = challanStatusSchema;