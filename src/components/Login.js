import React from 'react';
import Logo from "../assets/images/logo.png";
import LoginImg from "../assets/images/login.jpeg";
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <section>
            <div className="min-h-screen grid md:grid-cols-2">
                <div className="p-10 bg-[#F7FAFC]">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img className="h-16" alt="Logo" src={Logo}/>
                        <p className="font-bold font-poppins py-4 text-[20px]">MyApp</p>
                    </Link>

                    <p className="font-poppins font-bold text-[40px] text-[#172048] mt-[2rem]">Sign in</p>

                    <p className="font-poppins font-normal text-[16px] text-[#718096] mt-[2rem]">
                        Don't have an account? <Link to="/register" className="text-[#000039] font-medium underline hover:no-underline">Create now</Link>
                    </p>

                    <LoginForm/>
                </div>

                <div className="hidden sm:hidden md:block">
                    <img className="h-full w-full" alt="Login" src={LoginImg}/>
                </div>
            </div>
        </section>
    );
}

export default Login;