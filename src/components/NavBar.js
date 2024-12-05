import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("authToken");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <nav className="bg-[#172048] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse cursor-pointer">
                    <img className="h-16" alt="Logo" src={Logo} />
                    <p className="font-bold font-poppins py-4 text-[20px]">MyApp</p>
                </Link>
                <div className="flex items-center space-x-7 ml-10">
                    <Link to="/seminars" className="font-poppins text-[15px] text-[#F7FAFC] hover:text-[#4169e1] hover:underline">Seminars</Link>
                    <Link to="/customers" className="font-poppins text-[15px] text-[#F7FAFC] hover:text-[#4169e1] hover:underline">Customers</Link>
                    <Link to="/employees" className="font-poppins text-[15px] text-[#F7FAFC] hover:text-[#4169e1] hover:underline">Employees</Link>
                </div>
            </div>
            <div>
            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="text-[#F7FAFC] bg-[#4169e1] hover:bg-[#4169e1]-600 px-5 py-2.5 font-poppins font-semibold rounded-[20px] text-center"
                >
                    Log Out
                </button>
            ):(
                <Link to="/login">
                    <button
                        className="text-[#F7FAFC] bg-[#4169e1] hover:bg-[#4169e1]-600 px-5 py-2.5 font-poppins font-semibold rounded-[20px] text-center"
                    >
                        Log In
                    </button>
                </Link> 
            )}
            </div>
        </nav>
    );
};

export default Navbar;
