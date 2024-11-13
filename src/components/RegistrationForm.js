import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const form = event.target;
            const formData = new FormData(form);
            const jsonObject = Object.fromEntries(formData.entries());

            const emptyFields = [];
            form.querySelectorAll('input').forEach((input) => {
                if (!input.value) {
                    emptyFields.push(input.name);
                }
            });

            if (emptyFields.length > 0) {
                toast.error(`Please fill in the following fields: ${emptyFields.join(", ")}`);
                return;
            }

            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");

            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const response = await fetch("https://localhost:5221/api/Account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonObject),
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("User registered successfully", {
                    onClose: () => {
                        localStorage.setItem('userData', JSON.stringify(data.user));
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to register user");
        }
    };

    return (
    <form className="max-w-xl mt-[2rem]" onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                Username <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                id="username"
                autoComplete="off"
                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                name="username"
                placeholder="Enter username"
                required
            />
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                E-mail <span className="text-red-500">*</span>
            </label>
            <input
                type="email"
                id="email"
                autoComplete="off"
                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                name="email"
                placeholder="Enter email"
                required
            />
        </div>
        <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                    placeholder="Enter password"
                    name="password"
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
        <div className="mb-5">
            <label htmlFor="confirmPassword" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <input
                    type={showRepeatPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                    placeholder="Repeat password"
                    required
                />
                <FontAwesomeIcon
                    icon={showRepeatPassword ? faEye : faEyeSlash}
                    style={{
                        position: 'absolute',
                        right: '5%',
                        top: '30%',
                        cursor: 'pointer'
                    }}
                    onClick={toggleRepeatPasswordVisibility}
                />
            </div>
        </div>
        <button
            type="submit"
            className="mt-[2rem] text-[#F7FAFC] bg-[#4169e1] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center"
        >
            Register User
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
    );
};

export default RegisterForm;