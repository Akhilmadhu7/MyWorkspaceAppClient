import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {clearAuthCredentials} from "../../../store/authSlice";
import { persistedStore } from "../../../store/store";
import toast from "react-hot-toast";


const Logout = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user)

    const handleLogout = async () => {
        if (isUserAuthenticated) {
            dispatch(clearAuthCredentials());
            await persistedStore.purge();
            console.log("User logout successfully.")
            navigate("/signin");
            toast.success("Logged out successfully.");
        }
    }

  return (
    <button onClick={handleLogout} className="flex items-center px-4 -mx-2 hover:cursor-pointer hover:bg-gray-500 rounded-lg hover:py-2">
      <img
        className="object-cover mx-2 rounded-full h-9 w-9"
        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        alt="avatar"
      />
      <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
        {user?.userFirstName && user?.userLastName ? `${user.userFirstName} ${user.userLastName}` : "User"  }
      </span>
    </button>
  );
};

export default Logout;
