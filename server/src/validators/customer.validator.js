const { z } = require("zod");

const customerSchema = z.object({
  customerName: z.string().min(3),
  mobile: z.string().min(10).max(10),
  email: z.string().email(),
  businessName: z.string().min(2),
  gstNumber: z.string().optional(),
  customerType: z.enum([
    "RETAIL",
    "WHOLESALE",
    "DISTRIBUTOR"
  ]),
  address: z.string().min(5),
  status: z.enum([
    "LEAD",
    "ACTIVE",
    "INACTIVE"
  ]),
  followUpDate: z.string().optional(),
  notes: z.string().optional()
});

module.exports = customerSchema;