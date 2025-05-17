import React, { useState } from "react";
import axios from "axios";

const SendDefaulterAbsentEmail = () => {
    const [activeTab, setActiveTab] = useState("Fee Defaulters");
    const [admissionNumber, setAdmissionNumber] = useState("");  // changed to admission number
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [showList, setShowList] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowList(false);
        setAdmissionNumber("");  // reset admission number on tab change
        setSearchTerm("");
        setMessage("");
        setError("");
        setStudents([]);
    };

    
    const handleFind = async () => {
        try {
            setError("");
            setShowList(false);
            let fetchedStudents = [];
    
            // Ensure both admission number and student name are entered
            if (admissionNumber.trim() || searchTerm.trim()) {
                // Search by both admission number and student name
                const res = await axios.get("http://localhost:5000/api/students/search", {
                    params: { admissionNumber, studentName: searchTerm, type: "student-admission" },
                });
    
                // Check if the API returned a valid student or not
                if (res.data.success && res.data.student) {
                    fetchedStudents = [res.data.student];
                } else {
                    setError("No matching student found. Please check the admission number and student name.");
                }
            } else {
                setError("Please enter both Admission Number and Student Name.");
                return;
            }
    
            setStudents(fetchedStudents);
            setShowList(true);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch students.");
        }
    };
    

    const handleSendEmail = async () => {
        try {
            if (!message.trim()) {
                setError("Please enter an email message.");
                return;
            }
            if (students.length === 0) {
                setError("No students selected to send email.");
                return;
            }

            setIsSending(true);
            setError("");

            const emails = students
                .map((s) => s.emailAddress)
                .filter((email) => email); // filter out undefined/null

            if (emails.length === 0) {
                setError("No student email addresses found.");
                setIsSending(false);
                return;
            }

            await axios.post("http://localhost:5000/api/email/send-defaulters", {
                recipients: emails,
                subject: `${activeTab} Notification`,
                message,  // pass the message
            });

            alert("Email sent successfully!");
            setMessage("");
        } catch (err) {
            console.error(err);
            setError("Failed to send emails.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                Send Notifications
            </h1>

            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => handleTabChange("Fee Defaulters")}
                    className={`px-4 py-2 font-semibold ${activeTab === "Fee Defaulters"
                        ? "text-blue-700 border-b-2 border-blue-700"
                        : "text-gray-400"
                        }`}
                >
                    Fee Defaulters
                </button>
                <button
                    onClick={() => handleTabChange("Absent Students")}
                    className={`px-4 py-2 font-semibold ${activeTab === "Absent Students"
                        ? "text-blue-700 border-b-2 border-blue-700"
                        : "text-gray-400"
                        }`}
                >
                    Absent Students
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                    <input
                        type="text"
                        value={admissionNumber}
                        onChange={(e) => setAdmissionNumber(e.target.value)}
                        placeholder="Enter Admission Number..."
                        className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter student name..."
                        className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
                    />

                    <button
                        onClick={handleFind}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full md:w-auto"
                    >
                        Find
                    </button>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}
            </div>

            {showList && (
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                    {students.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-2">Student Name</th>
                                        <th className="px-4 py-2">Parent Name</th>
                                        <th className="px-4 py-2">Class</th>
                                        <th className="px-4 py-2">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-4 py-3">
                                                {student.firstName} {student.middleName} {student.lastName}
                                            </td>
                                            <td className="px-4 py-3">{student.parentName|| "N/A"}</td>
                                            <td className="px-4 py-3">{student.grade}</td>
                                            <td className="px-4 py-3">{student.emailAddress || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center py-6">
                            No students found.
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold text-gray-700 mb-2">Email Message</h2>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg"
                    placeholder={`Type your ${activeTab === "Fee Defaulters" ? "Fee Reminder" : "Absentee"} email here...`}
                />
                <div className="text-sm text-gray-400 mt-1">
                    {500 - message.length} characters remaining
                </div>
                <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className={`mt-4 px-6 py-2 rounded-lg flex items-center gap-2 justify-center w-full md:w-auto text-white transition-all duration-300 ${isSending
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isSending ? "Sending..." : "Send Email"}
                </button>
            </div>
        </div>
    );
};

export default SendDefaulterAbsentEmail;
