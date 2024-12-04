import React from 'react';
import Logo from "../../assets/images/logo.png";
import RegisterImg from '../../assets/images/login.jpeg';
import RegisterForm from "./RegistrationForm";
import {Link} from "react-router-dom";

const Register = () => {
    return(
        <section>
            <div className="min-h-screen grid md:grid-cols-2">
                <div className="p-10 bg-[#F7FAFC]">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <img className="h-16" alt="Logo" src={Logo}/>
                        <p className="font-bold font-poppins py-4 text-[20px]">Seminar Management</p>
                    </Link>

                    <p className="font-poppins font-bold text-[40px] text-[#172048] mt-[1rem]">Register</p>

                    <p className="font-poppins font-normal text-[16px] text-[#718096] mt-[2rem]">
                        Already have an account? <Link to="/login" className="text-[#000039] font-medium underline hover:no-underline">Log in</Link>
                    </p>

                    <RegisterForm/>
                </div>

                <div className="hidden sm:hidden md:block">
                    <img className="h-full w-full" alt="RegisterImg" src={RegisterImg}/>
                </div>
            </div>
        </section>
    );
}

export default Register;