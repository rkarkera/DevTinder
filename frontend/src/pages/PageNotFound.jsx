import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-error">404</h1>

        <h2 className="text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-base-content/70 mt-2">
          The page you are looking for does not exist.
        </p>

        <Link to="/feed" className="btn btn-primary mt-6">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;