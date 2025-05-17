// export default ShowandPreview;
import React, { useEffect, useState } from 'react';

const ShowandPreview = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

  // Fetch all enquiry records on mount
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/enquiry/history/fetch');
        if (!response.ok) throw new Error('Failed to fetch enquiries');
        const data = await response.json();
        setEnquiries(data);
        setFilteredEnquiries(data);
      } catch (error) {
        console.error(error);
        alert('Failed to load enquiries.');
      }
    };
    fetchEnquiries();
  }, []);

  // Live search filter
//   useEffect(() => {
//     const filtered = enquiries.filter((entry) =>
//       Object.values(entry).some((val) =>
//         val?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setFilteredEnquiries(filtered);
//     setCurrentPage(1); // Reset to page 1 on new search
//   }, [searchTerm, enquiries]);
    useEffect(() => {
  const filtered = enquiries.filter((entry) =>
    Object.values(entry).some((val) => {
      if (typeof val === 'string') {
        return val.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof val === 'number') {
        return val.toString().includes(searchTerm);
      }
      return false;
    })
  );
  setFilteredEnquiries(filtered);
  setCurrentPage(1);
}, [searchTerm, enquiries]);

    

    const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/enquiry/history?start=${startDate}&end=${endDate}`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `enquiry-history-${startDate}-to-${endDate}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download data.");
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const displayedRecords = filteredEnquiries.slice(startIndex, startIndex + recordsPerPage);

    return (<>
        <div className="w-full">
  <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Download Enquiry History</h3>
        <div className="flex gap-4 mb-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="date"
            value={endDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>
        </div>
      <div className="max-w-7xl mx-auto px-4 py-6">    
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Previous Enquiries</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded shadow text-lg"
          />
        </div>
      </div>

      {/* <div className="overflow-x-auto shadow border rounded">
        <table className="min-w-full table-auto text-base border-seperate border-spacing-y-2 text-left">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-3 py-2">Student Name</th>
              <th className="px-3 py-2">Parent/Guardian Name</th>
              <th className="px-3 py-2">Contact Number</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Class Interested</th>
              <th className="px-3 py-2">Communication Mode</th>
              <th className="px-3 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {displayedRecords.length > 0 ? (
              displayedRecords.map((entry, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-3 py-2">{entry.studentName}</td>
                  <td className="px-3 py-2">{entry.parentName}</td>
                  <td className="px-3 py-2">{entry.contactNumber}</td>
                  <td className="px-3 py-2">{entry.email}</td>
                  <td className="px-3 py-2">{entry.classInterested}</td>
                  <td className="px-3 py-2">{entry.communicationMode}</td>
                  <td className="px-3 py-2">{entry.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
            <div className="overflow-x-auto shadow border rounded">
  <table className="min-w-full table-auto text-base text-left border-separate border-spacing-y-2">
    <thead className="bg-blue-100 text-gray-700">
      <tr>
        <th className="px-4 py-3">Student Name</th>
        <th className="px-4 py-3">Parent/Guardian Name</th>
        <th className="px-4 py-3">Contact Number</th>
        <th className="px-4 py-3">Email</th>
        <th className="px-4 py-3">Class Interested</th>
        <th className="px-4 py-3">Communication Mode</th>
        <th className="px-4 py-3">Message</th>
      </tr>
    </thead>
    <tbody>
      {displayedRecords.length > 0 ? (
        displayedRecords.map((entry, idx) => (
          <tr key={idx} className="bg-white shadow rounded-md text-gray-900 ">
            <td className="px-4 py-3">{entry.studentName}</td>
            <td className="px-4 py-3">{entry.parentName}</td>
            <td className="px-4 py-3">{entry.contactNumber}</td>
            <td className="px-4 py-3">{entry.email}</td>
            <td className="px-4 py-3">{entry.classInterested}</td>
            <td className="px-4 py-3">{entry.communicationMode}</td>
            <td className="px-4 py-3">{entry.message}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="text-center py-4 text-blue-900">
            No enquiries found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
        </div>
        </>
  );
};

export default ShowandPreview;

