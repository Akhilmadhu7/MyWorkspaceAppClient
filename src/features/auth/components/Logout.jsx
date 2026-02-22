import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";


const Logout = () => {

    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
  return (
    <button className="flex items-center px-4 -mx-2">
      <img
        className="object-cover mx-2 rounded-full h-9 w-9"
        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        alt="avatar"
      />
      <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
        John Doe
      </span>
    </button>
  );
};

export default Logout;
