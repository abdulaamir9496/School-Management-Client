import { useState } from "react";
import StudentRegistrationForm from "./NewRegistration";

const NewRegistrationMainPage = ({ setPage }) => {
    const [activeTab, setActiveTab] = useState("registration");

    const renderComponent = () => {
        if (activeTab === "registration") {
            return <StudentRegistrationForm />;
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blue Header */}
            <div className="bg-blue-800 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold mb-4">New Student Registration</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab("registration")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "registration"
                            ? " bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Register Student
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-8 max-w-6xl mx-auto">
                {renderComponent()}
            </div>
        </div>
    );
};

export default NewRegistrationMainPage;
