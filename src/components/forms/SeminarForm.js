import React from 'react';
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/images/logo.png";

const SeminarForm = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonObject = Object.fromEntries(formData.entries());
    
        try {
            const response = await fetch("https://localhost:5230/api/Seminar/posttobc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonObject),
            });
    
            const isJson = response.headers.get("content-type")?.includes("application/json");
            const data = isJson ? await response.json() : null;
    
            if (!response.ok) {
                const errorMessage = data?.error || "Server responded with an error.";
                toast.error(errorMessage);
            } else {
                toast.success("Seminar added successfully, navigating to seminar list...", {
                    onClose: () => {
                        event.target.reset();
                        navigate("/seminars");
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };
    

    return (
        <>
        <section className="bg-[#F7FAFC]">
            <div className="container mx-auto min-h-screen p-8">
                <form className="mt-[2rem]" noValidate onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2">
                        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                            <img className="h-16" alt="Logo" src={Logo}/>
                            <p className="font-bold font-poppins py-4 text-[20px]">MyApp</p>
                        </Link>
                        {/* <p className="font-poppins font-bold text-[30px] text-[#172048] mt-[0rem]">Add Seminar</p> */}
                    </div>
                    <div className="grid md:grid-cols-2 gap-[6rem] mt-[2rem]">
                        <div>
                            <div className="mb-5">
                                <label htmlFor="docNo"
                                    className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                    Document Number <span className="text-red-500">*</span>
                                </label>
                                <input type="text" id="docNo" autoComplete="off"
                                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                    name="docNo" placeholder="Use the format SEM-00001" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name"
                                    className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input type="text" id="name" autoComplete="off"
                                    className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                    name="name" placeholder='Seminar Name' required />
                            </div>
                            <div>
                                <div className="mb-5">
                                    <label htmlFor="seminar_Duration" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                        Seminar Duration
                                    </label>
                                    <input type="number" id="seminar_Duration" autoComplete="off"
                                        className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                        name="seminar_Duration"/>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-[2rem]">
                                <div>
                                    <div className="mb-5">
                                        <label htmlFor="minimum_Participants" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                            Minimum Participants
                                        </label>
                                        <input type="number" id="minimum_Participants" autoComplete="off"
                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                            name="minimum_Participants" />
                                    </div>
                                </div>       
                                <div>
                                    <div className="mb-5">
                                        <label htmlFor="maximum_Participants" className="block mb-2 text-[18px] font-poppins font-medium text-[#718096]">
                                            Maximum Participants
                                        </label>
                                        <input type="number" id="maximum_Participants" autoComplete="off"
                                            className="bg-[#F7FAFC] border border-[#CBD5E0] font-poppins font-normal text-[#4A5568] text-[16px] rounded-[12px] w-full p-3"
                                            name="maximum_Participants" />
                                    </div>
                                </div>       
                            </div>
                            <div>
                                <button type="submit"
                                    className="mt-[2.5rem] text-[#F7FAFC] bg-[#4169e1] h-14 font-poppins font-semibold rounded-[20px] text-[20px] w-full px-5 py-2.5 text-center">
                                        Create
                                </button>
                            </div>
                        </div>                          
                    </div>
                </form>  
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