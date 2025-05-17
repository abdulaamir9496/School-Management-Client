import React, { useState } from 'react';
import axios from 'axios';

const FeesDefaulters = () => {
  const [defaulters, setDefaulters] = useState([]);
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [fetchingAll, setFetchingAll] = useState(false);


  const fetchDefaulters = async () => {
    if (!grade || !section) {
      alert('Please select both class and section.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/fees/students-with-balance', {
        params: { grade, section },
      });
      setDefaulters(response.data);
      setShowTable(true); // show table after fetching
    } catch (error) {
      console.error('Failed to fetch defaulters:', error);
      setDefaulters([]);
      setShowTable(true); // still show the "No defaulters" message
    }
  };
  const fetchAllDefaulters = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/fees/all-defaulters');
    setDefaulters(response.data);
    setShowTable(true);
    setFetchingAll(true);
  } catch (error) {
    console.error('Failed to fetch all defaulters:', error);
    setDefaulters([]);
    setShowTable(true);
    setFetchingAll(true);
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Fee Defaulters Report</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Select Class</option>
            {['Nursery', 'PP1', 'PP2', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Select Section</option>
            {['A', 'B', 'C'].map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>

          <button
            onClick={fetchDefaulters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Search
          </button>
          <button
  onClick={fetchAllDefaulters}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
>
  Get All Defaulters
</button>

        </div>
      </div>

      {showTable && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Admission No</th>
                  <th className="border border-gray-300 px-4 py-2">Student Name</th>
                  <th className="border border-gray-300 px-4 py-2">Class</th>
                  <th className="border border-gray-300 px-4 py-2">Section</th>
                  <th className="border border-gray-300 px-4 py-2">Total Fees</th>
                  <th className="border border-gray-300 px-4 py-2">Paid</th>
                  <th className="border border-gray-300 px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.length > 0 ? (
                  defaulters.map((student) => (
                    <tr key={student.admissionNumber}>
                      <td className="border border-gray-300 px-4 py-2">{student.admissionNumber}</td>
                      {/* <td className="border border-gray-300 px-4 py-2">{student.studentName}</td> */}
                      <td className="border border-gray-300 px-4 py-2">
                        {student.studentName.replace(/undefined/g, '').replace(/\s+/g, ' ').trim()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{student.grade}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.section}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.totalFees}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.totalPaid}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.balance}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center text-gray-500" colSpan="7">
                      No defaulters found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesDefaulters;
