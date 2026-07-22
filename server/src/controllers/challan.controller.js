const challanSchema = require("../validators/challan.validator");
const challanService = require("../services/challan.service");

const createChallan = async (req, res) => {
    try {

        const { customerId, items } = challanSchema.parse(req.body);

        const challan = await challanService.createChallan(
            customerId,
            items,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Sales Challan created successfully",
            data: challan,
        });

    } catch (error) {

        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }

        if (
            error.message === "Customer not found" ||
            error.message.includes("not found") ||
            error.message.includes("insufficient stock")
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getChallans = async (req, res) => {
    try {
        const challans = await challanService.getChallans();

        return res.status(200).json({
            success: true,
            count: challans.length,
            data: challans,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getChallanById = async (req, res) => {
    try {

        const { id } = req.params;

        const challan = await challanService.getChallanById(id);

        if (!challan) {
            return res.status(404).json({
                success: false,
                message: "Challan not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: challan,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};
const challanStatusSchema = require("../validators/challan-status.validator");

const updateChallanStatus = async (req, res) => {
    try {

        const { id } = req.params;

        const { status } = challanStatusSchema.parse(req.body);

        const challan = await challanService.getChallanById(id);

        if (!challan) {
            return res.status(404).json({
                success: false,
                message: "Challan not found",
            });
        }

        const updated = await challanService.updateChallanStatus(
            id,
            status
        );

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: updated,
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
module.exports = {
    createChallan,
    getChallans,
    getChallanById,
    updateChallanStatus,
};