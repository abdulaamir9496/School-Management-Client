import React, { useState } from "react";
import axios from "axios";

const FeesBalanceReport = () => {
  const [searchBy, setSearchBy] = useState("admission");
  const [searchTerm, setSearchTerm] = useState("");
  const [studentFound, setStudentFound] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [defaultersData, setDefaultersData] = useState([]);
  const [lastFailedSearchTerm, setLastFailedSearchTerm] = useState("");

  const handleSearch = async () => {
  if (searchTerm.trim() === "") {
    setSearchError("Please enter a valid search term");
    return;
  }

  setLoading(true);
  setSearchError("");
  setStudentFound(null);
  setStudentData(null);
  setDefaultersData([]);

  try {
    // 🔍 1️⃣ Fetch student data first
    const studentResponse = await axios.get('http://localhost:5000/api/students/search', {
      params: {
        admissionNumber: searchBy === "admission" ? searchTerm.trim() : undefined,
        studentName: searchBy === "name" ? searchTerm.trim() : undefined,
        academicYear,
      }
    });

    console.log("Search Response:", studentResponse.data); // ✅ Debugging

    if (studentResponse.data.success && studentResponse.data.student) {
      const student = studentResponse.data.student;

      // 🔍 2️⃣ Now fetch payment data using the admission number
      const paymentResponse = await axios.get('http://localhost:5000/api/fees', {
        params: {
          admissionNumber: student.admissionNumber,
        }
      });

      console.log("Payment Response:", paymentResponse.data); // ✅ Debugging

      // ✅ Calculate total paid amount
      let totalPaidAmount = 0;
      if (Array.isArray(paymentResponse.data.payments)) {
        totalPaidAmount = paymentResponse.data.payments.reduce((sum, payment) => sum + payment.amount, 0);
      }

      // ✅ Calculate balance (if student.totalFees is available)
      const totalFees = student.totalFees || 0;
      const balance = totalFees - totalPaidAmount;

      // ✅ Combine everything into student data
      const enrichedStudentData = {
        ...student,
        paidAmount: totalPaidAmount,
        balance,
      };

      console.log("Enriched Student Data:", enrichedStudentData); // 👀 Debug

      setStudentData(enrichedStudentData);
      setStudentFound(true);
      setLastFailedSearchTerm("");
    } else {
      setStudentFound(false);
      setLastFailedSearchTerm(searchTerm);
    }
  } catch (error) {
    console.error("Search failed:", error);
    setSearchError("Student not found");
    setStudentFound(false);
    setLastFailedSearchTerm(searchTerm); // Set failed term
  } finally {
    setLoading(false);
  }
};


  
  const handleFetchDefaulters = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/fees/defaulters");
      setDefaultersData(response.data);
    } catch (error) {
      console.error("Error fetching defaulters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 ">Fee Balance Report</h2>
        {/* <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {['2023-2024', '2024-2025', '2025-2026'].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select> */}
      </div>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="font-medium text-xl mr-4">Search By:</label>
            <label className="text-lg mr-4">
              <input
                type="radio"
                value="admission"
                checked={searchBy === "admission"}
                onChange={() => {
                  setSearchBy("admission");
                  setSearchTerm("");
                }}
              /> Admission No
            </label>
            <label className="text-lg mr-4">
              <input
                type="radio"
                value="name"
                checked={searchBy === "name"}
                onChange={() => {
                  setSearchBy("name");
                  setSearchTerm("");
                }}
              /> Name
            </label>
          </div>

          <input
            type="text"
            placeholder="Enter Admission No or Student Name..."
            className="border rounded px-3 py-2 flex-1 min-w-[180px]" // Reduced the width of the input field
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />

          <div className="flex gap-4">
            <button
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
  onClick={handleSearch}
>
  Find
</button>

<button
  onClick={handleFetchDefaulters}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
>
  Get All Students Report
</button>

          </div>
        </div>
      </div>

      {searchError && <div className="text-red-600 mb-4">{searchError}</div>}

      {studentFound && studentData && (
  <div className="bg--50 shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-4">Fee Balance Report</h3>

    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Admission No</th>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Total Fees</th>
            <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
            <th className="border border-gray-300 px-4 py-2">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">{studentData.admissionNumber}</td>
            <td className="border border-gray-300 px-4 py-2">
              {`${studentData.firstName} ${studentData.middleName || ""} ${studentData.lastName}`}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {`Class ${studentData.grade}`}
            </td>
            <td className="border border-gray-300 px-4 py-2">{studentData.totalFees || "N/A"}</td>
            <td className="border border-gray-300 px-4 py-2">{studentData.paidAmount ?? "0"}</td>
            <td className="border border-gray-300 px-4 py-2">{studentData.balance ?? "0"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}



{studentFound === false && lastFailedSearchTerm && !loading && (
  <div className="bg-white shadow-md rounded-lg p-4 text-center text-gray-500">
    No student found for "{lastFailedSearchTerm}"
  </div>
)}


      {/* Defaulters' Data Table */}
      {defaultersData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold mb-4">Fee Balance Report</h3>
          <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Admission No</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Total Fees</th>
                <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
                <th className="border border-gray-300 px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {defaultersData.map((defaulter) => (
                <tr key={defaulter.admissionNumber}>
                  <td className="border border-gray-300 px-4 py-2">{defaulter.admissionNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{defaulter.studentName}</td>
                  <td className="border border-gray-300 px-4 py-2">{defaulter.totalFees}</td>
                  <td className="border border-gray-300 px-4 py-2">{defaulter.totalPaid}</td>
                  <td className="border border-gray-300 px-4 py-2">{defaulter.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
};

export default FeesBalanceReport;
