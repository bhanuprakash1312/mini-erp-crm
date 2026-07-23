import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r">
      <h1 className="text-2xl font-bold p-5">
        ERP CRM
      </h1>

      <nav className="flex flex-col">

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/customers">
          Customers
        </NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/inventory">
          Inventory
        </NavLink>

        <NavLink to="/challans">
          Challans
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;