import { useState } from "react";
import EnquiryForm from "./EnquiryForm";
import ShowandPreview from "./ShowandPreview";

const Enquirymain = ({ setPage }) => {
    const [activeTab, setActiveTab] = useState("enquiryForm");

    const renderComponent = () => {
        switch (activeTab) {
            case "enquiryForm":
                return <EnquiryForm />;
            case "showAndPreview":
                return <ShowandPreview />;
            default:
                return <EnquiryForm />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blue Header */}
            <div className="bg-blue-800 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold mb-4">Enquiry Management</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab("enquiryForm")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "enquiryForm"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        Enquiry Form
                    </button>
                    <button
                        onClick={() => setActiveTab("showAndPreview")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "showAndPreview"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        Show and Preview
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

export default Enquirymain;
