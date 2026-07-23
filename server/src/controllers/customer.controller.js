const customerSchema = require("../validators/customer.validator");
const customerService = require("../services/customer.service");

const createCustomer = async (req, res) => {
  try {
    const validatedData = customerSchema.parse(req.body);

    if (validatedData.followUpDate) {
      validatedData.followUpDate = new Date(validatedData.followUpDate);
    }

    const customer = await customerService.createCustomer(validatedData);

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getCustomers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const data = await customerService.getCustomers(
      page,
      limit,
      search
    );

    res.json({
      success: true,
      page,
      limit,
      total: data.total,
      data: data.customers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await customerService.getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: customer,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate request body
        const validatedData = customerSchema.parse(req.body);

        // Convert followUpDate string to Date (if provided)
        if (validatedData.followUpDate) {
            validatedData.followUpDate = new Date(validatedData.followUpDate);
        }

        // Check if customer exists
        const existingCustomer = await customerService.getCustomerById(id);

        if (!existingCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        // Update customer
        const updatedCustomer = await customerService.updateCustomer(
            id,
            validatedData
        );

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer,
        });

    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if customer exists
        const existingCustomer = await customerService.getCustomerById(id);

        if (!existingCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        await customerService.deleteCustomer(id);

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
