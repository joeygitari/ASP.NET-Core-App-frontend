import React, { useState, useEffect } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Seminar = () => {
    const [seminars, setSeminars] = useState([]);
    const TABLE_HEAD = ["Seminar Name", "Seminar Duration"];
    
    useEffect(() => {
        fetchSeminars();
    }, []);
    
    const fetchSeminars = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("Access denied. Please login first.");
            return;
        }
        try {
            const response = await fetch("https://localhost:5230/api/Seminar", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSeminars(data);
            } else {
                console.error("Failed to fetch seminars");
            }
        } catch (error) {
            console.error("Error fetching seminars:", error);
        }
    };

    return (
        <div className="h-full w-full rounded-lg shadow-lg">
            <div className="rounded-none mb-8 flex items-center justify-between gap-8 p-10">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                    <img className="h-16" alt="Logo" src={Logo}/>
                    <p className="font-bold font-poppins py-4 text-[20px]">MyApp</p>
                </Link>
                <div></div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <a href="/seminars/new">
                        <button className="flex items-center gap-3 bg-[#172048] text-white font-poppins px-4 py-2 rounded-md hover:bg-blue-900">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> 
                            Add new seminar
                        </button>
                    </a>
                </div>
            </div>
            <div className="px-4">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <span className="font-poppins font-bold text-[#172048] opacity-70">
                                        {head}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {seminars.map((seminar, index) => {
                            const isLast = index === seminars.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700">
                                                {seminar.name || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700">
                                                {seminar.seminar_Duration || "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
        </div>
    );
};

export default Seminar;