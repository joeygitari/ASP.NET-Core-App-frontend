import React, { useState, useEffect } from "react";
import { UserPlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';
import NavBar from '../NavBar';
const Seminar = () => {
    const [seminars, setSeminars] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSeminar, setSelectedSeminar] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedDuration, setEditedDuration] = useState("");
    const TABLE_HEAD = ["Seminar No.","Seminar Name", "Seminar Duration", "Actions"];
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);  // State for current page
    const [itemsPerPage] = useState(10);  // Items per page

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

     // Get current seminars to display based on pagination
     const indexOfLastSeminar = currentPage * itemsPerPage;
     const indexOfFirstSeminar = indexOfLastSeminar - itemsPerPage;
     const currentSeminars = seminars.slice(indexOfFirstSeminar, indexOfLastSeminar);
 
     const totalPages = Math.ceil(seminars.length / itemsPerPage);
 
     const handlePageChange = (pageNumber) => {
         setCurrentPage(pageNumber);
     };

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleEditClick = (seminar) => {
        setSelectedSeminar(seminar);
        setEditedName(seminar.name || "");
        setEditedDuration(seminar.seminar_Duration || "");
        setEditModalOpen(true);
        setOpenDropdown(null)
    };

    const handleDeleteClick = (seminar) => {
        setSelectedSeminar(seminar);
        setDeleteModalOpen(true);
        setOpenDropdown(null)
    };

    const handleEditSave = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const guid = uuidv4();
            const response = await fetch(`https://localhost:5230/api/Seminar/${guid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ docNo: selectedSeminar.no, name: editedName, seminar_Duration: editedDuration }),
            });
            if (response.ok) {
                setLoading(false);
                toast.success("Seminar updated successfully!");
                setEditModalOpen(false);
                fetchSeminars();
            } else {
                toast.error("Failed to update seminar.");
            }
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred while updating.");
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const guid = uuidv4();
            const response = await fetch(`https://localhost:5230/api/Seminar/${guid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ docNo: selectedSeminar.no }),
            });
            if (response.ok) {
                setLoading(false);
                toast.success("Seminar deleted successfully!");
                setDeleteModalOpen(false);
                fetchSeminars();
            } else {
                toast.error("Failed to delete seminar.");
            }
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred while deleting.");
        }
    };

    return (
        <div className="h-full w-full bg-[#F7FAFC] rounded-lg shadow-lg">
            <NavBar />
           
            <div className="max-w-4xl mx-auto bg-[#F7FAFC] p-2 rounded-lg shadow-lg">
                <div className="rounded-none mb-8 flex items-center justify-between gap-8 p-10">
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <a href="/seminars/new">
                            <button className="flex items-center gap-3 bg-[#172048] text-[14px] text-white font-poppins px-2 py-2 rounded-md hover:bg-blue-900">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                                Add new seminar
                            </button>
                        </a>
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
                        {currentSeminars.map((seminar, index) => {
                            const isLast = index === currentSeminars.length - 1;
                            const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {seminar.no || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {seminar.name || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {seminar.seminar_Duration || "0"}
                                            </span>
                                        </div>
                                    </td>
                                    {/* <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {seminar.seminar_Price || "0.00"}
                                            </span>
                                        </div>
                                    </td> */}
                                    <td className={classes}>
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="bg-gray-100 rounded-full hover:bg-gray-200"
                                            >
                                                <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
                                            </button>

                                            {openDropdown === index && (
                                                <div className="absolute right-0 top-8 w-32 mt-0 z-10 bg-white border border-[#172048] rounded-md shadow-lg">
                                                    <ul className="text-sm text-gray-700">
                                                        <li
                                                            onClick={() => handleEditClick(seminar)}
                                                            className="border-b border-blue-gray-60 px-4 py-2 hover:bg-gray-100 cursor-pointer font-poppins font-bold text-[#172048] opacity-70"
                                                        >
                                                            Edit
                                                        </li>
                                                        <li
                                                            onClick={() => handleDeleteClick(seminar)}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-poppins font-bold text-[#172048] opacity-70"
                                                        >
                                                            Delete
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-poppins font-bold mb-4">Edit Seminar</h2>
                        <input
                            className="bg-[#F7FAFC] font-poppins font-normal rounded-[12px] border p-2 w-full mb-4"
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Seminar Name"
                        />
                        <input
                            className="bg-[#F7FAFC] font-poppins font-normal rounded-[12px] border p-2 w-full mb-4"
                            type="text"
                            value={editedDuration}
                            onChange={(e) => setEditedDuration(e.target.value)}
                            placeholder="Seminar Duration"
                        />
                        <button onClick={handleEditSave} disabled={loading} className="bg-[#4169e1] text-white font-poppins font-semibold px-5 py-2.5 rounded-[20px]">
                            {loading ? "Updating..." : "Save"}
                        </button>
                        <button onClick={() => setEditModalOpen(false)} className="ml-5 bg-red-500 text-white font-poppins font-semibold px-5 py-2.5 rounded-[20px]">Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-poppins font-bold mb-4">Confirm Delete</h2>
                        <p className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">Are you sure you want to delete this seminar?</p>
                        <button onClick={handleDeleteConfirm} disabled={loading} className="bg-red-500 text-white font-poppins font-semibold px-5 py-2.5 rounded-[20px]">
                            {loading ? "Deleting..." : "Yes, Delete"}
                        </button>
                        <button onClick={() => setDeleteModalOpen(false)} className="ml-20 bg-[#718096] text-white font-poppins font-semibold px-5 py-2.5 rounded-[20px]">Cancel</button>
                    </div>
                </div>
            )}
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
