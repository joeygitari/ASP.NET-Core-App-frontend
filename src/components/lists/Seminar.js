import React, { useState, useEffect } from "react";
import { UserPlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Seminar = () => {
    const [seminars, setSeminars] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSeminar, setSelectedSeminar] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedDuration, setEditedDuration] = useState("");
    const TABLE_HEAD = ["Seminar Name", "Seminar Duration", "Action"];

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

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleEditClick = (seminar) => {
        setSelectedSeminar(seminar);
        setEditedName(seminar.name || "");
        setEditedDuration(seminar.seminar_Duration || "");
        setEditModalOpen(true);
    };

    const handleDeleteClick = (seminar) => {
        setSelectedSeminar(seminar);
        setDeleteModalOpen(true);
    };

    const handleEditSave = async () => {
        try {
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
                toast.success("Seminar updated successfully!");
                setEditModalOpen(false);
                fetchSeminars();
            } else {
                toast.error("Failed to update seminar.");
            }
        } catch (error) {
            toast.error("An error occurred while updating.");
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const guid = uuidv4();
            const response = await fetch(`https://localhost:5230/api/Seminar/${guid}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.ok) {
                toast.success("Seminar deleted successfully!");
                setDeleteModalOpen(false);
                fetchSeminars();
            } else {
                toast.error("Failed to delete seminar.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        }
    };

    return (
        <div className="h-full w-full rounded-lg shadow-lg">
            <div className="rounded-none mb-8 flex items-center justify-between gap-8 p-10">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                    <img className="h-16" alt="Logo" src={Logo} />
                    <p className="font-bold font-poppins py-4 text-[20px]">MyApp</p>
                </Link>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <a href="/seminars/new">
                        <button className="flex items-center gap-3 bg-[#172048] text-[14px] text-white font-poppins px-4 py-2 rounded-md hover:bg-blue-900">
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
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 text-[16px]"
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
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {seminar.name || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[14px]">
                                                {seminar.seminar_Duration || "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 flex align-left">
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                            >
                                                <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
                                            </button>

                                            {openDropdown === index && (
                                                <div className="absolute right-0 top-0 w-32 mt-0 bg-white border border-[#172048] rounded-md shadow-lg">
                                                    <ul className="text-sm text-gray-700">
                                                        <li
                                                            onClick={() => handleEditClick(seminar)}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-poppins font-bold text-[#172048] opacity-70"
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
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Edit Seminar</h2>
                        <input
                            className="border p-2 w-full mb-4"
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Seminar Name"
                        />
                        <input
                            className="border p-2 w-full mb-4"
                            type="text"
                            value={editedDuration}
                            onChange={(e) => setEditedDuration(e.target.value)}
                            placeholder="Seminar Duration"
                        />
                        <button onClick={handleEditSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                        <button onClick={() => setEditModalOpen(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this seminar?</p>
                        <button onClick={handleDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Yes, Delete</button>
                        <button onClick={() => setDeleteModalOpen(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
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
