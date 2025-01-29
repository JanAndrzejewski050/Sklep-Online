import { useDispatch, useSelector } from "react-redux";
import { UserDropdown } from "../components/Dropdown";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../Redux/Actions/User";
import { useNavigate } from "react-router-dom";

import Checkout from "../pages/Checkout";
import { useState } from "react";

const Navbar = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const dispatch = useDispatch();

  const qty = useSelector(
    (state) => state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0)
  );

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate('/')
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-5">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <button onClick={handleLogoClick} className="text-white text-2xl font-semibold">Sklepx</button>
          </div>

          <div className="flex items-center space-x-5">
            {!userInfo ? (
              <Link
                to="/register"
                className="text-white bg-indigo-500 hover:bg-indigo-600 font-medium py-2 px-5 rounded-md transition duration-200"
              >
                Get Started
              </Link>
            ) : (
              <>
                <UserDropdown logoutHandler={logoutHandler} />
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative p-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-full transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {qty}
                  </span>
                </button>

                <Checkout open={open} setOpen={setOpen} />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          type="button"
          className="inline-flex items-center p-2 justify-center text-white bg-indigo-600 rounded-md"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Navigation Menu */}
      <div className={`md:flex ${open ? "block" : "hidden"} bg-indigo-700 md:bg-transparent`}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-6">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-indigo-200 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-lg font-medium hover:text-indigo-200 transition duration-200"
          >
            About
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
