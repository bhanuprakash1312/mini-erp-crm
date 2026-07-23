const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes")
const customerRoutes = require("./routes/customer.routes")
const productRoutes = require("./routes/product.routes")
const inventoryRoutes = require("./routes/inventory.routes")
const challanRoutes = require("./routes/challan.routes")
const DashboardRoutes = require("./routes/dashboard.routes")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/customers",customerRoutes)
app.use("/api/inventory",inventoryRoutes)
app.use("/api/products",productRoutes)
app.use("/api/challans",challanRoutes)
app.use("/api/dashboard",DashboardRoutes)
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Mini ERP CRM"
    });
});

module.exports = app;