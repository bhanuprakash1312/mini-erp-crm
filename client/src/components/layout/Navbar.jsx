import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-bold">ERP CRM</h2>

      <div>
        Welcome, <strong>{user?.name || "User"}</strong>
      </div>
    </header>
  );
};

export default Navbar;