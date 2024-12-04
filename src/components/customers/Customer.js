import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../NavBar';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const TABLE_HEAD = ["Number", "Name", "Contact", "Country Code"];
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://localhost:7232/api/customer", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                setCustomers(data.customers);
            } else {
                toast.error("Failed to fetch customers");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching customers:", error);
        }
    };

     const indexOfLastCustomer = currentPage * itemsPerPage;
     const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
     const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
 
     const totalPages = Math.ceil(customers.length / itemsPerPage);
 
     const handlePageChange = (pageNumber) => {
         setCurrentPage(pageNumber);
     };

    return (
        <div className="h-full w-full bg-[#F7FAFC] rounded-lg shadow-lg">
            <NavBar />
           
            <div className="max-w-4xl mx-auto bg-[#F7FAFC] p-2 rounded-lg shadow-lg">
                <div className="rounded-none flex items-center justify-between gap-8 p-10">
                    <div className="flex shrink-0 flex-col sm:flex-row">
                        <span className="text-[20px] text-[#172048] font-poppins font-bold">Customers</span>
                    </div>
                </div>
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm transition-colors hover:bg-blue-gray-50 text-[#172048] opacity-70"
                                >
                                    <span className="font-poppins font-bold text-[#172048] opacity-70">
                                        {head}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((customer, index) => {
                            const isLast = index === currentCustomers.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {customer.no || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {customer.name || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {customer.contact || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {customer.country_Region_Code || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {loading && (
                    <div className="flex justify-center items-center">
                        <div 
                            className="animate-spin rounded-full h-10 w-10 mt-10 mb-10 border-4 border-[#4169e1] border-t-transparent"
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                {/* <div className="flex justify-center items-center">
                </div> */}
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-5 p-2 gap-10">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1} 
                        className="bg-[#4169e1] opacity-70 text-white font-poppins px-5 py-2.5 rounded-[20px] text-sm"
                    >
                        Previous
                    </button>
                    <span className="font-poppins text-[#172048] text-[14px] px-5 py-2.5 opacity-70">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages} 
                        className="bg-[#4169e1] opacity-70 text-white font-poppins px-5 py-2.5 rounded-[20px] text-sm"
                    >
                        Next
                    </button>
                </div>
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

export default Customer;
