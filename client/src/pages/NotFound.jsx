import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link to="/dashboard">
        Go to Dashboard
      </Link>

    </div>
  );
};

export default NotFound;