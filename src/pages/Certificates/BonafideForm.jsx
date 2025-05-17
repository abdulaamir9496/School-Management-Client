import React, { useState } from "react";

function BonafideForm() {
  const [searchBy, setSearchBy] = useState("admissionNumber");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  
  const [formData, setFormData] = useState({
    studentFullName: "",
    admissionNumber: "",
    className: "",
    section: "",
    academicYear: "2024-2025",
    issueDate: new Date().toISOString().split("T")[0],
    reason: "",
    fatherName: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return alert("Please enter a value to search.");
    setIsLoading(true);
    try {
      const queryParam =
        searchBy === "admissionNumber"
          ? `admissionNumber=${searchValue}`
          : `studentName=${searchValue}`;

      console.log("Searching with URL:", `http://localhost:5000/api/idcard/find-student?${queryParam}`);
      
      const res = await fetch(
        `http://localhost:5000/api/idcard/find-student?${queryParam}`
      );

      if (!res.ok) {
        alert("Student not found.");
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      const studentData = data.students[0];

      const fullName = `${studentData.firstName} ${
        studentData.middleName ? studentData.middleName + " " : ""
      }${studentData.lastName}`.trim();

      // For debugging - log the student data
      console.log("Student data received:", studentData);

      // Prioritize the class that comes from the student data
      const studentClass = studentData.grade || studentData.class || studentData.className || "";
      
      setFormData({
        ...formData,
        studentFullName: fullName,
        admissionNumber: studentData.admissionNumber || studentData.rollNumber,
        className: studentClass, // Use the class from student data
        section: studentData.section || "",
        fatherName: studentData.parentName || studentData.fatherName || "",
        gender: studentData.gender || "",
        dob: studentData.dateOfBirth
          ? new Date(studentData.dateOfBirth)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "",
        address: studentData.address,
        phone: studentData.phoneNumber,
      });

      setShowStudentForm(true);
    } catch (error) {
      console.error(error);
      alert("Error fetching student data.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const { studentFullName, admissionNumber, className, section, issueDate, reason } = formData;
    if (!studentFullName || !admissionNumber || !className || !section || !issueDate || !reason) {
      alert('❌ Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      const res = await fetch('http://localhost:5000/api/bonafide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        throw new Error('Submission failed');
      }

      const result = await res.json();
      console.log("Certificate submission result:", result);
      
      alert('✅ Certificate generated successfully!');
      
      // Reset form after successful submission
      handleReset();
      
    } catch (err) {
      console.error('Error generating certificate:', err);
      alert('❌ Error generating certificate');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      studentFullName: "",
      admissionNumber: "",
      className: "",
      section: "",
      academicYear: "2024-2025",
      issueDate: new Date().toISOString().split("T")[0],
      reason: "",
      fatherName: "",
      gender: "",
      dob: "",
      address: "",
      phone: "",
    });
    setShowStudentForm(true);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow mb-6 w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Bonafide Certificate Generator</h2>
        <div className="flex flex-wrap items-center gap-4">
          <label className="font-semibold text-lg">Search By</label>
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
            className="px-4 py-2 border rounded w-full md:w-64 h-9 border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-1"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          {/* <button
            onClick={() => {
              setShowStudentForm(true);
              handleReset();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg"
          >
            New Certificate
          </button> */}
        </div>
      </div>

      {showStudentForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-xl font-bold mb-6 text-blue-600">Certificate Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="studentFullName"
              type="text"
              value={formData.studentFullName}
              onChange={handleChange}
              placeholder="Student Full Name"
              className="w-full border rounded p-2"
              required
            />
            <input
              name="admissionNumber"
              type="text"
              value={formData.admissionNumber}
              onChange={handleChange}
              placeholder="Admission Number"
              className="w-full border rounded p-2"
              required
            />
            <div className="flex gap-2">
              <input
                name="className"
                type="text"
                value={formData.className}
                onChange={handleChange}
                placeholder="Class"
                className="w-1/2 border rounded p-2"
                required
              />
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-1/2 border rounded p-2"
                required
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <input
              name="academicYear"
              type="text"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="Academic Year"
              className="w-full border rounded p-2"
              required
            />
            <input
              name="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Reason for Certificate"
              className="w-full border rounded p-2"
              rows="3"
              required
            />
            
            <div className="pt-2">
              <h3 className="text-md font-semibold mb-2 text-gray-700">Additional Information</h3>
              <input
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's Name"
                className="w-full border rounded p-2 mb-2"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Certificate"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BonafideForm;