import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonObject = Object.fromEntries(formData.entries());

        try {
            setLoading(true);
            const response = await fetch("https://localhost:7232/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonObject),
            });
            const data = await response.json();
            if (data.success === false) {
                setLoading(false);
                toast.error(data.message);
            } else {
                setLoading(false);
                toast.success("Login successful.", {
                    onClose: () => {
                        localStorage.setItem('authToken', data.data.token);
                        navigate("/seminars");
                    }
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <form className="max-w-xl mt-[2rem]" onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-[16px] font-poppins font-medium text-[#718096]">
                    Username
                </label>
                <input type="username" id="username" autoComplete="off" name="username"
                       className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[14px] rounded-[12px] w-full p-3"
                       placeholder="Enter your username" required/>
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-[16px] font-poppins font-medium text-[#718096]">
                    Password
                </label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} id="password" name="password"
                        className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[14px] rounded-[12px] w-full p-3"
                        placeholder="Enter your password"
                        required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            style={{
                                position: 'absolute',
                                right: '5%',
                                top: '30%',
                                cursor: 'pointer'
                            }}
                            onClick={togglePasswordVisibility}
                        />
                </div>
            </div>

            <button type="submit" disabled={loading}
                className="mt-[1.5rem] text-[#F7FAFC] bg-[#4169e1] h-14 font-poppins font-semibold rounded-[20px] text-[18px] w-full px-5 py-2.5 text-center">
                {loading ? "Logging you in..." : "Log in"}
            </button>
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </form>
    )
}

export default LoginForm;