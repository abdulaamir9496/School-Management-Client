import React, { useState } from 'react';
import axios from 'axios';

const classes = ['Nursery', 'PP1', 'PP2', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const sections = ['A', 'B', 'C'];

const DisplayStudentInfo = () => {
  const [selectedClass, setSelectedClass] = useState('Nursery');
  const [selectedSection, setSelectedSection] = useState('A');
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [noStudents, setNoStudents] = useState(false);
  const [message, setMessage] = useState('');
  const [boysCount, setBoysCount] = useState(0);
  const [girlsCount, setGirlsCount] = useState(0);

  const handleSearch = async () => {
    console.log("Search button clicked");
    setShowTable(false);
    setNoStudents(false);
    setMessage('');

    try {
      const response = await axios.get('http://localhost:5000/api/students/getstudents', {
        params: { grade: selectedClass, section: selectedSection },
      });

      console.log(response.data);
      setStudents(response.data);

      if (response.data.length === 0) {
        setNoStudents(true);
        setMessage("No students found for the selected class and section.");
      } else {
        setShowTable(true);
      }

      const boys = response.data.filter(student => student.gender === 'Male').length;
      const girls = response.data.filter(student => student.gender === 'Female').length;

      setBoysCount(boys);
      setGirlsCount(girls);
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response && error.response.status === 404) {
        setNoStudents(true);
        setMessage("No students found for the selected class and section.");
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif',marginTop:'20px', backgroundColor: '#f9fafb', borderRadius: '10px', boxShadow: '0 2px 8px rgba(141, 24, 24, 0.1)' }}>
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Student Information</h2>

      {/* Class Tabs */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '10px' }}>
        {classes.map((cls) => (
          <button
          key={cls}
          onClick={() => setSelectedClass(cls)}
          className={`px-3 py-1.5 border rounded transition-colors duration-100 ${
            selectedClass === cls
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
              : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
          }`}
        >
          {cls}
        </button>
        
        ))}
      </div>

      {/* Section Tabs and Search Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '10px' }}>
          {sections.map((sec) => (
           <button
           key={sec}
           onClick={() => setSelectedSection(sec)}
           className={`px-3 py-1.5  border rounded-md transition-colors duration-100 ${
             selectedSection === sec
               ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
               : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
           }`}
         >
           Section {sec}
         </button>
         
          ))}
        </div>
        <button
  onClick={handleSearch}
  className="px-4 py-1.5 bg-blue-600 text-white rounded-md h-10 hover:bg-blue-700 transition-duration-200"
>
  Search Students
</button>

      </div>

      {/* No Students Message */}
      {message && (
        <div style={{ marginTop: '20px', fontSize: '1rem', color: 'red', textAlign: 'center' }}>
          {message}
        </div>
      )}

      {/* Student Table */}
      {showTable && (
        <>
        <div className="mt-5 overflow-x-auto bg-white p-4 rounded-md shadow sm:overflow-visible sm:bg-transparent sm:p-0 sm:rounded-none">
  <table className="w-full border-collapse text-sm">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="p-2.5 border border-gray-500">Admission No</th>
      <th className="p-2.5 border border-gray-500">Class</th>
      <th className="p-2.5 border border-gray-500">Section</th>
      <th className="p-2.5 border border-gray-500">Roll No</th>
      <th className="p-2.5 border border-gray-500">Student Name</th>
      <th className="p-2.5 border border-gray-500">Parent Name</th>
    </tr>
  </thead>
  <tbody>
    {students.map((student, index) => (
      <tr key={index}>
        <td className="p-2.5 border border-gray-500">{student.admissionNumber}</td>
        <td className="p-2.5 border border-gray-500">{student.grade}</td>
        <td className="p-2.5 border border-gray-500">{student.section}</td>
        <td className="p-2.5 border border-gray-500">{student.rollNumber}</td>
        <td className="p-2.5 border border-gray-500">
          {`${student.firstName} ${student.middleName || ''} ${student.lastName}`}
        </td>
        <td className="p-2.5 border border-gray-500">{student.parentName}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>


          {/* Student Stats */}
          <div className="mt-5 ml-8 flex items-center gap-5">
  <div>
    Total Students: 
    <input
      type="text"
      className="w-12 ml-1 px-1 py-0.5 border border-gray-100 rounded focus:outline-none "
      value={students.length}
      readOnly
    />
  </div>
  <div>
    Boys: 
    <input
      type="text"
      className="w-12 ml-1 px-1 py-0.5 focus:outline-none  border border-gray-100 rounded"
      value={boysCount}
      readOnly
    />
  </div>
  <div>
    Girls: 
    <input
      type="text"
      className="w-12 ml-1 px-1 py-0.5 focus:outline-none  border border-gray-100 rounded"
      value={girlsCount}
      readOnly
    />
  </div>
</div>

        </>
      )}
    </div>
  );
};

export default DisplayStudentInfo;
