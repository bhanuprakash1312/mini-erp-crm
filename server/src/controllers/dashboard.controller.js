const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
    try {

        const dashboard =
            await dashboardService.getDashboard();

        return res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

module.exports = {
    getDashboard,
};