import { useState } from "react";
import FeesPayment from "./FeesPayment";
import FeesBalanceReport from "./FeesBalanceReport";
import FeesDefaulters from "./FeesDefaulters";
// import FeesPaymentReport from "./FeesPaymentReport";

const FeesMainPage = ({ setPage }) => {
    const [activeTab, setActiveTab] = useState("payment");

    // Render the active component based on the selected tab
    const renderComponent = () => {
        switch (activeTab) {
            case "payment":
                return <FeesPayment />;
            case "balanceReport":
                return <FeesBalanceReport />;
            case "defaulters":
                return <FeesDefaulters />;
            case "paymentReport":
                return <FeesPaymentReport />;
            default:
                return <FeesPayment />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blue Header */}
            <div className="bg-blue-800 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold mb-4">Fees Management</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab("payment")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "payment"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Fee Payment
                    </button>
                    <button
                        onClick={() => setActiveTab("balanceReport")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "balanceReport"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Fee Balance Report
                    </button>
                    <button
                        onClick={() => setActiveTab("defaulters")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "defaulters"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Fee Defaulters
                    </button>
                    {/* Uncomment if needed */}
                    {/* <button
                        onClick={() => setActiveTab("paymentReport")}
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === "paymentReport"
                            ? "bg-white text-blue-800"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Fee Payment Reports
                    </button> */}
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

export default FeesMainPage;
