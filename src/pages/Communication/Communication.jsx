import { useState } from "react";
import SendSingleSMS from "./SendSingleSMS";
import SendGroupSMS from "./SendGroupSMS";
import SendDefaulterAbsentSMS from "./SendDefaulterAbsentSMS";
import SentSMSHistory from "./SentSMSHistory";

const Communication = ({ setPage }) => {
    const [activeTab, setActiveTab] = useState("singleSMS");

    const renderComponent = () => {
        switch (activeTab) {
            case "singleSMS":
                return <SendSingleSMS />;
            case "groupSMS":
                return <SendGroupSMS />;
            case "defaulterAbsentSMS":
                return <SendDefaulterAbsentSMS />;
            case "smsHistory":
                return <SentSMSHistory />;
            default:
                return <SendSingleSMS />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blue Header */}
            <div className="bg-blue-800 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold mb-4">Mail Management</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab("singleSMS")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "singleSMS"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        Send Single Mail
                    </button>
                    <button
                        onClick={() => setActiveTab("groupSMS")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "groupSMS"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        Send Group Mail
                    </button>
                    <button
                        onClick={() => setActiveTab("defaulterAbsentSMS")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "defaulterAbsentSMS"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        Send Defaulter/Absent Mail
                    </button>
                    <button
                        onClick={() => setActiveTab("smsHistory")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "smsHistory"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        Mail History
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 max-w-6xl mx-auto">
                {renderComponent()}
            </div>

        </div>
    );
};

export default Communication;
