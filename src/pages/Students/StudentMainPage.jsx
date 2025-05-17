import { useState } from "react";
import StudentRegistrationForm from "./StudentRegistrationForm";
import IDCardGenerator from "./IDCardGenerator";
import DisplayStudentInfo from "./DisplayStudentInfo";

const StudentMainPage = ({ setPage }) => {
    const [activeTab, setActiveTab] = useState("info");

    const renderComponent = () => {
        switch (activeTab) {
            case "info":
                return <DisplayStudentInfo />;
            case "idCard":
                return <IDCardGenerator />;
            case "registration":
                return <StudentRegistrationForm />;
            default:
                return <DisplayStudentInfo />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blue Header */}
            <div className="bg-blue-800 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold mb-4">Student Section</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "info"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Student Info
                    </button>
                    <button
                        onClick={() => setActiveTab("idCard")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "idCard"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        ID Card Generator
                    </button>
                    <button
                        onClick={() => setActiveTab("registration")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "registration"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Get All Students Info
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 max-w-6xl mx-auto">
                {renderComponent()}
            </div>

            {/* Back Button */}
            
        </div>
    );
};

export default StudentMainPage;
