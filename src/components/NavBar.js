import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

// #4b8bc3, #145c9c, #233741
const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("authToken");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-[#172048] text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link to="#" className="flex items-center space-x-2">
                        <img className="h-10" alt="Logo" src={Logo} />
                        <p className="font-bold font-poppins text-[18px]">Seminar Management</p>
                    </Link>

                    {/* Navigation Links (Always Left-Aligned) */}
                    <div
                        className={`${
                            menuOpen ? "block" : "hidden"
                        } md:flex md:items-center md:space-x-6 ml-10`}
                    >
                        <Link
                            to="/seminars"
                            className="block md:inline-block font-poppins text-[15px] text-[#F7FAFC] hover:text-[#4169e1] hover:underline"
                        >
                            Seminars
                        </Link>
                        <Link
                            to="/customers"
                            className="block md:inline-block font-poppins text-[15px] text-[#F7FAFC] hover:text-[#4169e1] hover:underline"
                        >
                            Customers
                        </Link>
                        <Link
                            to="/employees"
                            className="block md:inline-block font-poppins text-[15px] text-[#F7FAFC] hover:text-[#4169e1] hover:underline"
                        >
                            Employees
                        </Link>
                    </div>
                </div>

                {/* Hamburger Icon for Mobile */}
                <button
                    className="text-white md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                                menuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />
                    </svg>
                </button>

                {/* Login/Logout Button */}
                <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="mt-4 md:mt-0 text-[#F7FAFC] bg-[#4169e1] hover:bg-[#315bbd] px-5 py-2.5 font-poppins font-semibold rounded-[20px] text-center"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login">
                            <button
                                className="mt-4 md:mt-0 text-[#F7FAFC] bg-[#4169e1] hover:bg-[#315bbd] px-5 py-2.5 font-poppins font-semibold rounded-[20px] text-center"
                            >
                                Log In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
