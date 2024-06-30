import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../src/store/authSlice.js";
import Cookies from "js-cookie"
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const handleLogout = () => {
    
    dispatch(logout());
    Cookies.remove("token");
    navigate("/");
  };
  const navElements = [
    {
      name: "Home",
      isActive: true,
      redirect: "/",
    },
    {
      name: "About",
      isActive: true,
      redirect: "/about",
    },
    {
      name: "All Records",
      isActive: authStatus,
      redirect: "/all-records",
    },
    {
      name: "Add Records",
      isActive: authStatus,
      redirect: "/add-records",
    },
    {
      name: "Analytics",
      isActive: authStatus,
      redirect: "/analytics",
    },
    {
      name: "Login/Register",
      isActive: !authStatus,
      redirect: "/login",
    },
  ];

  return (
    <div className="flex shadow-md shadow-slate-300 fixed h-16 text-center z-20 items-center w-full bg-white ">
      <span className="justify-start mx-6 font-bold text-xl bg-white ">
        Budget Buddy
      </span>{" "}
      <ul className="flex space-x-10 ml-auto mx-20 cursor-pointer  ">
        {navElements.map(
          (li) =>
            li.isActive && (
              <li className="hover:bg-neutral-200 font-semibold text-lg p-2 rounded-lg"key={li.name} onClick={() => navigate(li.redirect)}>
                {li.name}
              </li>
            )
        )}
        {authStatus && <li className="hover:bg-neutral-200 font-semibold text-lg p-2 rounded-lg" onClick={handleLogout}>Logout</li>}
      </ul>
    </div>
  );
}

export default NavBar;
