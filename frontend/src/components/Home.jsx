import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user, loading } = useSelector((store) => store.user);

  if (loading) return <div>Loading...</div>;

  return user
    ? <Navigate to="/feed" replace />
    : <Navigate to="/login" replace />;
};

export default Home;