import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import CustomerList from "../pages/CustomerList";
import CustomerForm from "../pages/CustomerForm";
import ProductList from "../pages/ProductList";
import ProductForm from "../pages/ProductForm";
import StockIn from "../pages/StockIn";
import StockOut from "../pages/StockOut";
import InventoryHistory from "../pages/InventoryHistory";
import LowStock from "../pages/LowStock";
import ChallanList from "../pages/ChallanList";
import CreateChallan from "../pages/CreateChallan";
import ChallanDetails from '../pages/challan/ChallanDetails';
import ChallanDetails from "../pages/ChallanDetails";
export default function AppRoutes() {
  return (
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />

        <Route path="/customers/add" element={<CustomerForm />} />

        <Route path="/customers/edit/:id" element={<CustomerForm />} />
        <Route path="/products" element={<ProductList />} />

        <Route path="/products/add" element={<ProductForm />} />

        <Route path="/products/edit/:id" element={<ProductForm />} />

        <Route path="/inventory/history" element={<InventoryHistory />} />

        <Route path="/inventory/stock-in" element={<StockIn />} />

        <Route path="/inventory/stock-out" element={<StockOut />} />

        <Route path="/inventory/low-stock" element={<LowStock />} />
        <Route
          path="/challans"
          element={<ChallanList />}
        />
        <Route
          path="/challans/create"
          element={<CreateChallan />}
        />
      </Route>
      <Route
        path="/challans/:id"
        element={<ChallanDetails />}
      />
    </Route>
  );
}
