import React, { useState } from 'react';

const SentSMSHistory = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [dataFetched, setDataFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailHistory, setEmailHistory] = useState([]);

    const handleSearch = async () => {
    // ✅ Check if both dates are selected
    if (!fromDate || !toDate) {
        alert("Please select both From and To dates before searching.");
        return;
    }

    setLoading(true);
    setDataFetched(false);

    try {
        const response = await fetch('http://localhost:5000/api/email/history');
        const result = await response.json();

        if (result.success) {
            setEmailHistory(result.logs);
            setDataFetched(true);
        } else {
            alert('Failed to fetch email history.');
        }
    } catch (error) {
        alert('Error fetching email history: ' + error.message);
    } finally {
        setLoading(false);
    }
};


    const filteredHistory = emailHistory.filter((email) => {
        const recipientsArray = Array.isArray(email.recipients)
            ? email.recipients.map(r => (typeof r === 'string' ? r : r.email))
            : [email.recipients];
    
        // Filter by search text in recipients
        const isRecipientMatch = recipientsArray.join(', ').toLowerCase().includes(searchText.toLowerCase());
    
        // Convert the email's sent date to a JavaScript Date object
       const emailDate = new Date(email.sentAt);
const from = fromDate ? new Date(fromDate) : null;
const to = toDate ? new Date(new Date(toDate).setHours(23, 59, 59, 999)) : null;

const isDateMatch =
    (!from || emailDate >= from) &&
    (!to || emailDate <= to);

    
        // Return true if both conditions match
        return isRecipientMatch && isDateMatch;
    });
    
    
    // Function to handle print
    const handlePrint = () => {
        const printContents = document.getElementById("printable-table").innerHTML;
    
        // Open a new window
        const printWindow = window.open('', '', 'width=800,height=600');
    
        if (printWindow) {
            // Create the HTML document structure
            const doc = printWindow.document;
            doc.open();
            const html = doc.createElement('html');
            const head = doc.createElement('head');
            const title = doc.createElement('title');
            title.textContent = 'Print';
            const style = doc.createElement('style');
            style.textContent = `
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; }
            `;
            head.appendChild(title);
            head.appendChild(style);
            const body = doc.createElement('body');
            body.innerHTML = printContents;
    
            html.appendChild(head);
            html.appendChild(body);
            doc.appendChild(html);
            doc.close();
    
            // Wait for the content to render, then print
            printWindow.focus();
            printWindow.print();
            printWindow.onafterprint = () => {
                printWindow.close();
            };
        } else {
            alert("Failed to open print window.");
        }
    };
    
    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Mail History</h1>

            {/* Filters */}
            <div className="bg-white-50 p-6 rounded-3xl mb-8 border border-blue-100">
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    From<input
                        type="date"
                        className="p-3 rounded-3xl border border-blue-300 focus:ring-2 focus:ring-blue-400"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />To
                    <input
                        type="date"
                        className="p-3 rounded-3xl border border-blue-300 focus:ring-2 focus:ring-blue-400"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-3xl font-semibold transition-all duration-300"
                    >
                        Search
                    </button>
                </div>
            </div>

            {loading && (
                <div className="text-center text-blue-600 font-semibold mb-6">
                    Fetching messages...
                </div>
            )}

            {dataFetched && (
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Search recipient..."
                        className="p-3 rounded-3xl border border-blue-300 focus:ring-2 focus:ring-blue-400"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            )}

{dataFetched && fromDate && toDate && (
    <div className="bg-white border border-blue-100 rounded-3xl shadow-md overflow-x-auto">
        {filteredHistory.length > 0 ? (
            <div id="printable-table">
                            <table className="w-full text-center">
                                <thead className="bg-blue-100">
                                    <tr>
                                        <th className="py-4 px-6 text-blue-700">Date</th>
                                        <th className="py-4 px-6 text-blue-700">Recipients</th>
                                        <th className="py-4 px-6 text-blue-700">Subject</th>
                                        <th className="py-4 px-6 text-blue-700">Message</th>
                                        <th className="py-4 px-6 text-blue-700">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistory.map((email) => (
                                        <tr key={email._id} className="border-t border-blue-100 hover:bg-blue-50 transition-all">
                                            <td className="py-4">{new Date(email.sentAt).toLocaleDateString('en-GB')}</td>

                                            <td className="py-4">{email.recipients.join(', ')}</td>
                                            <td className="py-4">{email.subject}</td>
                                            <td className="py-4">
                                                {email.message.length > 30 ? `${email.message.slice(0, 30)}...` : email.message}
                                            </td>
                                            <td className="py-4">
                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    {email.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
        ) : (
            <div className="text-center text-gray-500 py-8">
                No records found.
            </div>
        )}
    </div>
)}

            {/* Print Button */}
            {dataFetched && filteredHistory.length > 0 && (
                <div className="mt-6 text-left">
                <button
                    onClick={handlePrint}
                    className="mt-7 px-9 py-2 rounded-lg flex items-center gap-2 justify-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-all duration-100"
                >
                    Print
                </button>
            </div>
            )}
        </div>
    );
};

export default SentSMSHistory;
