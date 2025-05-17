import React, { useState } from 'react';
import BonafideForm from './BonafideForm';
import BonafideTracker from './BonafideTracker';

const BonafideMainPage = () => {
    const [activeTab, setActiveTab] = useState('form');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blue Header */}
            <div className="bg-blue-800 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold mb-4">
                    Bonafide Certificate Management
                </h1>

                <div className="flex justify-center gap-4">
                    <button
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === 'form'
                                ? 'bg-white text-blue-800'
                                : 'bg-blue-700 hover:bg-blue-600'
                            }`}
                        onClick={() => setActiveTab('form')}
                    >
                        Bonafide Form
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md font-medium shadow ${activeTab === 'tracker'
                                ? 'bg-white text-blue-800'
                                : 'bg-blue-700 hover:bg-blue-600'
                            }`}
                        onClick={() => setActiveTab('tracker')}
                    >
                        Bonafide Tracker
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 max-w-6xl mx-auto">
                {activeTab === 'form' ? <BonafideForm /> : <BonafideTracker />}
            </div>
        </div>
    );
};

export default BonafideMainPage;
