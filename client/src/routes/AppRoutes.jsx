import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import Layout from "../components/layout/Layout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import CustomerList from "../pages/customer/CustomerList";
import CustomerForm from "../pages/customer/CustomerForm";

import ProductList from "../pages/product/ProductList";
import ProductForm from "../pages/product/ProductForm";

import StockIn from "../pages/inventory/StockIn";
import StockOut from "../pages/inventory/StockOut";
import InventoryHistory from "../pages/inventory/InventoryHistory";
import LowStock from "../pages/inventory/LowStock";

import ChallanList from "../pages/challan/ChallanList";
import CreateChallan from "../pages/challan/CreateChallan";
import ChallanDetails from "../pages/challan/ChallanDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={
          localStorage.getItem("token")
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* All Protected Pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          {/* Dashboard - Everyone */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ADMIN",
                  "SALES",
                  "ACCOUNTS",
                  "WAREHOUSE",
                ]}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Customers */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "SALES", "ACCOUNTS"]}
              />
            }
          >
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/add" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />
          </Route>

          {/* Products */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "SALES", "WAREHOUSE"]}
              />
            }
          >
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
          </Route>

          {/* Inventory */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "WAREHOUSE"]}
              />
            }
          >
            <Route path="/inventory/history" element={<InventoryHistory />} />
            <Route path="/inventory/stock-in" element={<StockIn />} />
            <Route path="/inventory/stock-out" element={<StockOut />} />
            <Route path="/inventory/low-stock" element={<LowStock />} />
          </Route>

          {/* Challans */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "SALES", "WAREHOUSE"]}
              />
            }
          >
            <Route path="/challans" element={<ChallanList />} />
            <Route path="/challans/create" element={<CreateChallan />} />
            <Route path="/challans/:id" element={<ChallanDetails />} />
          </Route>

        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}