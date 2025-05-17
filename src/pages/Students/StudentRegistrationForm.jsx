import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const DisplayStudentInfo = () => {
  const [searchType, setSearchType] = useState('admissionNo');
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState('image'); // or 'pdf'
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [isAllStudentsView, setIsAllStudentsView] = useState(false);


  const handleSearch = async () => {
    try {
      const params =
        searchType === 'admissionNo'
          ? { admissionNumber: query }
          : { studentName: query };

      const response = await axios.get(
        'http://localhost:5000/api/Newregistration/findStudents',
        { params }
      );

      if (response.data.students.length === 0) {
        setNotFound(true);
        setStudents([]);
        setShowTable(false);
        setIsAllStudentsView(false);
      } else {
        setStudents(response.data.students);
        setNotFound(false);
        setShowTable(true);
      }
      setIsAllStudentsView(false);
    } catch (error) {
      console.error('Error occurred while searching', error);
      setNotFound(true);
      setStudents([]);
      setShowTable(false);
      setIsAllStudentsView(false); 
    }
  };

  const handleGetAll = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/newRegistration/getstudents');

      // Ensure we access the students array correctly
      setStudents(response.data.students || []); // Default to an empty array if students key is missing
      setShowTable(true);
      setNotFound(false);
      setIsAllStudentsView(true); // enable pagination
    setCurrentPage(1); 
    } catch (error) {
      console.error('Fetching all students failed', error);
      setStudents([]);
      setShowTable(false);
      setIsAllStudentsView(false);
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setQuery('');
    setStudents([]);
    setShowTable(false);
    setNotFound(false);
  };
  const fetchImageAsBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image as base64', error);
      return null;
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-IN');
  };

  const renderDocument = (filename) => {
    if (!filename) return 'N/A';

    const fileUrl = `http://localhost:5000/uploads/${filename}`;
    const isPDF = filename.toLowerCase().endsWith('.pdf');

    return isPDF ? (
      <img
        src="/pdf-icon.png" // Use a local PDF icon or any public one
        alt="PDF Document"
        className="w-10 h-10 object-contain cursor-pointer hover:scale-105"
        onClick={() => {
          setPreviewFile(fileUrl);
          setPreviewType('pdf');
        }}
      />
    ) : (
      <img
        src={fileUrl}
        alt="Document"
        className="w-14 h-14 object-cover rounded cursor-pointer hover:scale-105"
        onClick={() => {
          setPreviewFile(fileUrl);
          setPreviewType('image');
        }}
      />
    );
  };

  const renderPhoto = (filename) =>
    filename ? (
      <img
        src={`http://localhost:5000/uploads/${filename}`}
        alt="student"
        className="w-14 h-14 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
        onClick={() =>
          setPreviewImage(`http://localhost:5000/uploads/${filename}`)
        }
      />
    ) : (
      'N/A'
    );

    const downloadExcel = () => {
      const formattedData = students.map(student => ({
        Name: [student.firstName, student.middleName, student.lastName].filter(Boolean).join(' '),
        DOB: formatDate(student.dateOfBirth),
        Gender: student.gender || 'N/A',
        BloodGroup: student.bloodGroup || 'N/A',
        Class: student.grade || 'N/A',
        Section: student.section || 'N/A',
        AcademicYear: student.academicYear || 'N/A',
        AdmissionNo: student.admissionNumber || 'N/A',
        RollNo: student.rollNumber || 'N/A',
        TotalFees: student.totalFees || 'N/A',
        ParentName: student.parentName || 'N/A',
        Relationship: student.relationship || 'N/A',
        Phone: student.phoneNumber || 'N/A',
        Email: student.emailAddress || 'N/A',
        Address: student.address || 'N/A',
        BirthCertificate: student.birthCertificate
          ? `http://localhost:5000/uploads/${student.birthCertificate}`
          : 'N/A',
        PreviousMarksheet: student.previousMarksheet
          ? `http://localhost:5000/uploads/${student.previousMarksheet}`
          : 'N/A',
        TransferCertificate: student.transferCertificate
          ? `http://localhost:5000/uploads/${student.transferCertificate}`
          : 'N/A',
      }));
    
      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Students');
      XLSX.writeFile(wb, 'students_data.xlsx');
    };
    const paginatedStudents = students.slice(
  (currentPage - 1) * studentsPerPage,
  currentPage * studentsPerPage
);
const emptyRows = studentsPerPage - paginatedStudents.length;

  
  return (
  <div className="p-4">
    {/* Search Section */}
    <div className="bg-white p-4 rounded shadow-md mb-4 flex flex-wrap items-center gap-4">
      <label className="font-semibold">Search By:</label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          value="admissionNo"
          checked={searchType === 'admissionNo'}
          onChange={() => handleSearchTypeChange('admissionNo')}
        />
        Admission No
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          value="name"
          checked={searchType === 'name'}
          onChange={() => handleSearchTypeChange('name')}
        />
        Name
      </label>
      <input
        type="text"
        placeholder="Enter Admission No or Student Name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow min-w-[200px] px-3 py-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Find
      </button>
      <button
        onClick={handleGetAll}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get All Students
      </button>
    </div>

    {/* Download Excel Button (Placed at the top) */}
    {showTable && (
      <div className="mt-4 flex justify-end">
        <button
          onClick={downloadExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
        >
          Download as Excel
        </button>
      </div>
    )}

    {/* Alert if no student found */}
    {notFound && (
      <div className="text-red-600 font-semibold mb-4">
        No student found with given{' '}
        {searchType === 'admissionNo' ? 'Admission Number' : 'Name'}.
      </div>
    )}

    {/* Student Table */}
    {showTable && (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-[1400px] w-full border-separate border-spacing-y-2 text-sm text-left">
          <thead>
            <tr className="bg-gray-200 uppercase text-xs text-gray-700">
              {[
                'Photo',
                'Name',
                'DOB',
                'Gender',
                'Blood Group',
                'Class',
                'Section',
                'Academic Year',
                'Admission No',
                'Roll No',
                'Total Fees',
                'Parent',
                'Relation',
                'Phone',
                'Email',
                'Address',
                'Birth Certificate',
                'Previous Marksheet',
                'Transfer Certificate',
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 font-bold border-b whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student) => (
              <tr key={student._id} className="bg-white shadow-sm">
                <td className="px-4 py-2">{renderPhoto(student.studentPhoto)}</td>
                <td className="px-4 py-2">
                  {[student.firstName, student.middleName, student.lastName]
                    .filter(Boolean)
                    .join(' ')}
                </td>
                <td className="px-4 py-2">{formatDate(student.dateOfBirth)}</td>
                <td className="px-4 py-2">{student.gender || 'N/A'}</td>
                <td className="px-4 py-2">{student.bloodGroup || 'N/A'}</td>
                <td className="px-4 py-2">{student.grade || 'N/A'}</td>
                <td className="px-4 py-2">{student.section || 'N/A'}</td>
                <td className="px-4 py-2">{student.academicYear || 'N/A'}</td>
                <td className="px-4 py-2">{student.admissionNumber || 'N/A'}</td>
                <td className="px-4 py-2">{student.rollNumber || 'N/A'}</td>
                <td className="px-4 py-2">{student.totalFees || 'N/A'}</td>
                <td className="px-4 py-2">{student.parentName || 'N/A'}</td>
                <td className="px-4 py-2">{student.relationship || 'N/A'}</td>
                <td className="px-4 py-2">{student.phoneNumber || 'N/A'}</td>
                <td className="px-4 py-2">{student.emailAddress || 'N/A'}</td>
                <td className="px-4 py-2">{student.address || 'N/A'}</td>
                <td className="px-4 py-2">
                  {renderDocument(student.birthCertificate)}
                </td>
                <td className="px-4 py-2">
                  {renderDocument(student.previousMarksheet)}
                </td>
                <td className="px-4 py-2">
                  {renderDocument(student.transferCertificate)}
                </td>
              </tr>
            ))}
            {Array.from({ length: emptyRows }).map((_, index) => (
              <tr key={`empty-${index}`} className="h-[56px]">
                <td colSpan={19}></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {isAllStudentsView && (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded text-2xl ${
                currentPage === 1
                  ? 'cursor-not-allowed hover:bg-gray-300'
                  : 'text-white hover:bg-gray-300 '
              }`}
              title="Previous Page"
            >
              ◀
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {Math.ceil(students.length / studentsPerPage)}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(students.length / studentsPerPage)
                    ? prev + 1
                    : prev
                )
              }
              disabled={currentPage >= Math.ceil(students.length / studentsPerPage)}
              className={`p-2 rounded text-2xl ${
                currentPage >= Math.ceil(students.length / studentsPerPage)
                  ? 'cursor-not-allowed hover:bg-gray-300'
                  : 'text-white hover:bg-gray-300 '
              }`}
              title="Next Page"
            >
              ▶
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);
};
export default DisplayStudentInfo;