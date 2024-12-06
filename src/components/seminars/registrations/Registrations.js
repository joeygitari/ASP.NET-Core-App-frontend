import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../../NavBar';

const Registrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const TABLE_HEAD = ["Number", "Seminar Number", "Seminar Name", "Starting Date", "Status", "", ""];
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [contacts, setContacts] = useState([]);
    // const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCustomerName, setSelectedCustomerName] = useState("");
    const [selectedCustomerNo, setSelectedCustomerNo] = useState("");
    const [selectedContactNo, setSelectedContactNo] = useState("");
    const [selectedConfirmed, setSelectedConfirmed] = useState(false);
    
    useEffect(() => {
        fetchRegistrations();
        fetchCustomers();
        fetchContacts();
    }, []);

    const fetchRegistrations = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("Access denied. Please login first.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("https://localhost:7232/api/Seminar/AvailableSeminars", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                setRegistrations(data.data);
            } else {
                toast.error("Failed to fetch registrations");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching registrations:", error);
        }
    };

    const fetchCustomers = async () => {
        try {
            // setLoading(true);
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

    const fetchContacts = async (customerName) => {
        if (!customerName) return;
        try {
            // setLoading(true);
            const token = localStorage.getItem("authToken");
            const response = await fetch(`https://localhost:7232/api/Seminar/Contacts/${customerName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.ok) {
                setLoading(false);
                const data = await response.json();
                setContacts(data.data);
            } else {
                toast.error("Failed to fetch contacts");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching contacts:", error);
        }
    };
   
    useEffect(() => {
        if (selectedRegistration && selectedRegistration.no) {
            const fetchParticipants = async () => {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    toast.error("Access denied. Please login first.");
                    return;
                }
                try {
                    setParticipants([]);
                    setLoading(true);
                    
                    const response = await fetch(`https://localhost:7232/api/Seminar/MyRegistrations?headerNo=${selectedRegistration.no}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setParticipants(data.data);
                        setLoading(false);
                    } else {
                        toast.error("Failed to fetch participants");
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Error fetching participants");
                }
            };

            fetchParticipants();
        }
    }, [selectedRegistration]);

    const indexOfLastRegistration = currentPage * itemsPerPage;
    const indexOfFirstRegistration = indexOfLastRegistration - itemsPerPage;
    const currentRegistrations = registrations.slice(indexOfFirstRegistration, indexOfLastRegistration);
 
    const totalPages = Math.ceil(registrations.length / itemsPerPage);
 
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNewClick = (registration) => {
        setSelectedRegistration(registration);
        setAddModalOpen(true);
    };

    const handleViewClick = (registration) => {
        setSelectedRegistration(registration);
        setViewModalOpen(true);
        // fetchParticipants();
    };

    const handleNewRegistration = async () => {
        // console.log(selectedRegistration);
        try{
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const response = await fetch(`https://localhost:7232/api/Seminar/Registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    semNo: selectedRegistration.no,
                    companyNo: selectedCustomerNo,
                    participantContactNo: selectedContactNo,
                    confirmed: selectedConfirmed
                }),
            });
            const data = await response.json();
            if (data.success === false){
                setLoading(false);
                toast.error("Failed to register user");
            } else {
                setLoading(false);
                toast.success("Participant Registered successfully");
                setAddModalOpen(false);
            }
        } catch(error){
            setLoading(false);
            toast.error("An error occurred while updating");
        }
    };

    return (
        <div className="h-full w-full bg-[#F7FAFC] rounded-lg shadow-lg">
            <NavBar />
           
            <div className="max-w-4xl mx-auto bg-[#F7FAFC] p-2 rounded-lg shadow-lg">
                <div className="rounded-none flex items-center justify-between gap-8 p-10">
                    <div className="flex shrink-0 flex-col sm:flex-row">
                        <span className="text-[20px] text-[#172048] font-poppins font-bold">Seminar Registrations</span>
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
                        {currentRegistrations.map((registration, index) => {
                            const isLast = index === currentRegistrations.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                                {registration.no || "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                                {registration.seminar_No || "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                                {registration.seminar_Name || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                                {/* {registration.starting_Date || "Unknown"} */}
                                                {registration.starting_Date 
                                                    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(registration.starting_Date)) 
                                                    : "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                                {registration.status || "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        {/* <a href="#"> */}
                                            <button onClick={() => handleNewClick(registration)} className="flex items-center gap-1 bg-[#4169e1] text-[12px] text-white font-poppins px-2 py-2 rounded-md hover:bg-blue-900">
                                                {/* <PlusIcon strokeWidth={1} className="h-4 w-4" /> */}
                                                New Registration
                                            </button>
                                        {/* </a> */}
                                    </td>
                                    <td className={classes}>
                                        {/* <a href="#"> */}
                                            <button onClick={() => handleViewClick(registration)}  className="flex items-center gap-3 bg-[#4169e1] text-[12px] text-white font-poppins px-2 py-2 rounded-md hover:bg-blue-900">
                                                View Participants
                                            </button>
                                        {/* </a> */}
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
            {/* Add Modal */}
            {addModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-poppins font-bold mb-6">
                    Add New Registration
                </h2>
                <form className="font-poppins">
                    <div className="mb-5">
                    <label
                        htmlFor="company"
                        className="text-sm font-poppins font-medium text-gray-600 mb-2 block"
                    >
                        Select Company <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="company"
                        onChange={(e) => {
                            const selectedIndex = e.target.selectedIndex;
                            const selectedNo = e.target.value;
                            const selectedName = e.target.options[selectedIndex].text;

                            setSelectedCustomerNo(selectedNo);
                            setSelectedCustomerName(selectedName);
                            fetchContacts(selectedName);
                        }}
                        value={selectedCustomerNo}
                        className="bg-gray-50 font-poppins font-normal rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">--</option>
                        {customers.map((customer, index) => (
                            <option key={index} value={customer.no}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-5">
                    <label
                        htmlFor="participant"
                        className="text-sm font-poppins font-medium text-gray-600 mb-2 block"
                    >
                        Select Participant Contact<span className="text-red-500">*</span>
                    </label>
                    <select
                        id="participant"
                        value={selectedContactNo}
                        onChange={(e) => setSelectedContactNo(e.target.value)}
                        className="bg-gray-50 font-poppins font-normal rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">--</option>
                        {contacts.map((contact, index) => (
                            <option key={index} value={contact.no}>
                                {contact.name}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className="mb-5">
                    <label
                        htmlFor="confirmed"
                        className="text-sm font-poppins font-medium text-gray-600 mb-2 block"
                    >
                        Confirmed <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={selectedConfirmed}
                        onChange={(e) => setSelectedConfirmed(e.target.value === "true")}
                        className="bg-gray-50 font-poppins font-normal rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    </div>

                    <div className="flex justify-end mt-6 space-x-3">
                    <button
                        disabled={loading}
                        onClick={handleNewRegistration}
                        className="bg-blue-600 text-white font-poppins font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Add"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setAddModalOpen(false)}
                        className="bg-red-500 text-white font-poppins font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}
            {/* Add Participants Modal */}
            {/* View Participants Modal */}
            {viewModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-poppins font-bold mb-6">
                    Participants
                </h2>
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm transition-colors hover:bg-blue-gray-50 text-[#172048] opacity-70">
                                <span className="font-poppins font-bold text-[#172048] opacity-70">
                                    Name
                                </span>
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm transition-colors hover:bg-blue-gray-50 text-[#172048] opacity-70">
                                <span className="font-poppins font-bold text-[#172048] opacity-70">
                                    Company Number
                                </span>
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm transition-colors hover:bg-blue-gray-50 text-[#172048] opacity-70">
                                <span className="font-poppins font-bold text-[#172048] opacity-70">
                                    Contact Number
                                </span>
                            </th>
                            {/* <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm transition-colors hover:bg-blue-gray-50 text-[#172048] opacity-70">
                                <span className="font-poppins font-bold text-[#172048] opacity-70">
                                    Seminar Number
                                </span>
                            </th> */}
                            {/* <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm transition-colors hover:bg-blue-gray-50 text-[#172048] opacity-70">
                                <span className="font-poppins font-bold text-[#172048] opacity-70">
                                    Seminar Name
                                </span>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant, index) => (
                        <tr key={index}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                        {participant.participantName}            
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                        {participant.companyNo}            
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                        {participant.participantContactNo}            
                                    </span>
                                </div>
                            </td>
                            {/* <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                        {participant.seminarNo}            
                                    </span>
                                </div>
                            </td> */}
                            {/* <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <span className="font-poppins font-normal text-gray-700 text-[12px]">
                                        {participant.seminarName}            
                                    </span>
                                </div>
                            </td> */}
                        </tr>
                        ))}
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
                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        type="button"
                        onClick={() => setViewModalOpen(false)}
                        className="bg-red-500 text-white font-poppins font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-red-600 transition"
                    >
                        Close
                    </button>
                </div>
                </div>
            </div>
            )}
            {/* View Participants Modal */}
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

export default Registrations;
