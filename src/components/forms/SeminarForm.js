import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/images/logo.png";

const SeminarForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validateForm = (formData) => {
        const { name, minimum_Participants, maximum_Participants } = formData;
        if (!name.trim()) {
            toast.error("Name is required.");
            return false;
        }
        if (minimum_Participants && maximum_Participants && +minimum_Participants > +maximum_Participants) {
            toast.error("Minimum Participants cannot be greater than Maximum Participants.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonObject = Object.fromEntries(formData.entries());

        if (!validateForm(jsonObject)) return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("Access denied. Please login first.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("https://localhost:5230/api/Seminar/posttobc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(jsonObject),
            });
    
            const isJson = response.headers.get("content-type")?.includes("application/json");
            const data = isJson ? await response.json() : null;
    
            if (!response.ok) {
                const errorMessage = data?.error || "Server responded with an error.";
                toast.error(errorMessage);
            } else {
                setLoading(false);
                toast.success("Seminar added successfully, navigating to seminar list...", {
                    onClose: () => {
                        event.target.reset();
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
        <>
        <nav className="bg-[#172048] text-white p-2 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                    <img className="h-16" alt="Logo" src={Logo} />
                    <p className="font-bold font-poppins py-4 text-[20px]">MyApp</p>
                </Link>
            </div>
            <div>
                <Link to="/seminars">
                    <p className="font-medium underline font-poppins py-4 text-[14px] mr-8 ">back to seminars</p>
                </Link>
            </div>
        </nav>
        <section className="bg-[#F7FAFC] flex items-center justify-center min-h-screen">
       
            <div className="flex items-center justify-center p-8 max-w-2xl w-full">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <form noValidate onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center justify-center mb-4">
                            <Link to="/" className="flex items-center space-x-3 cursor-pointer">
                                <img className="h-16" alt="Logo" src={Logo}/>
                                {/* <p className="font-bold font-poppins text-[20px]">MyApp</p> */}
                            </Link>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name"
                                className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="name" autoComplete="off"
                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[12px] rounded-[12px] w-full p-3"
                                name="name" placeholder='Seminar Name' required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="seminar_Duration" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                                Seminar Duration
                            </label>
                            <input type="number" id="seminar_Duration" autoComplete="off"
                                className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[12px] rounded-[12px] w-full p-3"
                                name="seminar_Duration"/>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-5">
                                <label htmlFor="minimum_Participants" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                                    Minimum Participants
                                </label>
                                <input type="number" id="minimum_Participants" autoComplete="off"
                                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[12px] rounded-[12px] w-full p-3"
                                    name="minimum_Participants" />
                            </div>       
                            <div className="mb-5">
                                <label htmlFor="maximum_Participants" className="block mb-2 text-[14px] font-poppins font-medium text-[#718096]">
                                    Maximum Participants
                                </label>
                                <input type="number" id="maximum_Participants" autoComplete="off"
                                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[12px] rounded-[12px] w-full p-3"
                                    name="maximum_Participants" />
                            </div>       
                        </div>
                        <div>
                            <button type="submit" disabled={loading}
                                className="mt-2 text-white bg-[#4169e1] h-14 font-poppins font-semibold rounded-[20px] text-[16px] w-full px-5 py-2.5 text-center">
                                    {loading ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </form>  
                </div>
            </div>
        </section>
        <ToastContainer
            position="top-right"
            autoClose={3000}
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
        </>
    );
};

export default SeminarForm;