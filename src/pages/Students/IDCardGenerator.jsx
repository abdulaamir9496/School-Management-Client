// ... all your imports
import React, { useState } from "react";
import schlogo from "../../assets/schlogo.png";

function IDCardGenerator() {
  const [searchBy, setSearchBy] = useState("admissionNumber");
  const [searchValue, setSearchValue] = useState("");
  const [student, setStudent] = useState({
    name: "",
    fatherName: "",
    studentClass: "",
    rollNo: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    photo: null,
    logo: schlogo,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setStudent({ ...student, [name]: URL.createObjectURL(files[0]) });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handlePrint = () => {
    const printContents = document.getElementById("idCard").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return alert("Please enter a value to search.");
    setIsLoading(true);
    try {
      const queryParam =
        searchBy === "admissionNumber"
          ? `admissionNumber=${searchValue}`
          : `studentName=${searchValue}`;

      const res = await fetch(
        `https://school-management-server-yhtv.onrender.com/api/idcard/find-student?${queryParam}`
      );

      if (!res.ok) {
        return alert("Student not found.");
      }

      const data = await res.json();
      const studentData = data.students[0];

      setStudent({
        name: `${studentData.firstName} ${studentData.middleName ? " " + studentData.middleName : ""} ${studentData.lastName}`.trim(),
        fatherName: studentData.parentName,
        studentClass: `${studentData.grade} - ${studentData.section}`,
        rollNo: studentData.rollNumber,
        gender: studentData.gender,
        dob: studentData.dateOfBirth
  ? new Date(studentData.dateOfBirth)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-")  // replace slashes with dashes
  : "",


        address: studentData.address,
        phone: studentData.phoneNumber,
        photo: studentData.studentPhoto
          ? `https://school-management-server-yhtv.onrender.com/uploads/${studentData.studentPhoto}`
          : null,
        logo: student.logo,
      });

      setShowStudentForm(true);
      setShowPreview(true);
    } catch (error) {
      console.error(error);
      alert("Error fetching student data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #idCard, #idCard * {
              visibility: visible;
            }
            #idCard {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        `}
      </style>
      
      {/* Search Form */}
      <div className="bg-white p-4 rounded shadow mb-6 w-full"> 
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Identity Card Generator</h2>
      <div className="flex flex-wrap items-center gap-4">
        <label className="font-semibold text-lg">Generate By</label>
        <label>
          <input
            type="radio"
            name="searchBy"
            value="admissionNumber"
            checked={searchBy === "admissionNumber"}
            onChange={() => setSearchBy("admissionNumber")}
          />
          <span className="ml-2 text-lg">Admission No</span>
        </label>
        <label>
          <input
            type="radio"
            name="searchBy"
            value="studentName"
            checked={searchBy === "studentName"}
            onChange={() => setSearchBy("studentName")}
          />
          <span className="ml-2 text-lg">Student Name</span>
        </label>
        <input
          type="text"
          placeholder={
            searchBy === "admissionNumber"
              ? "Enter Admission No..."
              : "Enter Student Name..."
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-2 border rounded w-74 h-9 border-black-100 hover:border-black-200 focus:outline-none focus:ring-1 "
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700  text-white px-4 py-1.5 rounded-lg hover:bg-blue-700"
          disabled={isLoading}
        >
          Generate
        </button>
      </div></div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        {showStudentForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-blue-600">Student Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={student.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="fatherName"
                placeholder="Father Name"
                value={student.fatherName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="studentClass"
                placeholder="Class"
                value={student.studentClass}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="rollNo"
                placeholder="Roll Number"
                value={student.rollNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded text-gray-700"
              >
                <option value="" disabled hidden>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={student.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={student.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />

              <label className="block">
                <span className="text-gray-700">Student Photo</span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* ID Card Preview */}
        {showPreview && (
          <div
            id="idCard"
            className="bg-white border border-gray-300 rounded shadow flex flex-col justify-between text-center mx-auto w-full max-w-xs h-120 p-4"
            
          >
            <div className="flex flex-col items-center">
              {student.logo && (
                <img
                  src={student.logo}
                  alt="School Logo"
                  className="h-16 object-contain mb-6"
                />
              )}
              <div className="w-26 h-29 bg-gray-200 flex items-center justify-center overflow-hidden rounded border border-gray-400">
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-xs">Photo</span>
                )}
              </div>

              <div className="text-xs text-left w-full space-y-1.5 mt-4">
                <p><strong>Name:</strong> <span className="pl-1">{student.name}</span></p>
                <p><strong>Father:</strong> <span className="pl-1">{student.fatherName}</span></p>
                <p><strong>Class:</strong> <span className="pl-1">{student.studentClass}</span></p>
                <p><strong>Roll No:</strong> <span className="pl-1">{student.rollNo}</span></p>
                <p><strong>Gender:</strong> <span className="pl-1">{student.gender}</span></p>
                <p><strong>DOB:</strong> <span className="pl-1">{student.dob}</span></p>
                <p><strong>Address:</strong> <span className="pl-1">{student.address}</span></p>
                <p><strong>Phone:</strong> <span className="pl-1">{student.phone}</span></p>
              </div>
            </div>

            <div className="mt-5 text-[11px] text-gray-700 leading-tight text-center bg-blue">
              #20-4-159, Syed Ali Chabutra, Shah Ali Banda Road, Hyderabad-65.
              <br />
              Contact: 8686463718, 8008553468
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {showStudentForm && (
        <div className="flex justify-between items-center gap-4 mt-8">
          <button
            onClick={togglePreview}
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded hover:bg-blue-200"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          {showPreview && (
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 rounded-lg"
            >
              Print
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default IDCardGenerator;
