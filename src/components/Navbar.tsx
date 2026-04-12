import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex justify-between p-4 bg-white shadow">

      <Link to="/">Home</Link>

      <div className="flex gap-4">

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <Link to="/my-bookings">Bookings</Link>
            <button onClick={signOut}>Logout</button>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;