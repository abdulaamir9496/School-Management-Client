import React, { useState } from "react";
import * as XLSX from "xlsx";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    contactNumber: '',
    email: '',
    classInterested: '',
    communicationMode: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required.';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required.';
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid.';
    }
    if (!formData.classInterested.trim()) newErrors.classInterested = 'Class/Grade is required.';
    if (!formData.communicationMode.trim()) newErrors.communicationMode = 'Preferred communication mode is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              studentName: '',
              parentName: '',
              contactNumber: '',
              email: '',
              classInterested: '',
              communicationMode: '',
              message: '',
            });
          }, 3000);
        } else {
          const errData = await response.json();
          alert(errData.error || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error submitting enquiry:', error);
        alert('Failed to submit enquiry');
      }
    }
  };
  
  return (
    <div className="max-w-lg mx-auto">
      {/* Header and download button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-blue-600 font-bold">Student Enquiry Form</h1>
       
      </div>

      
      {/* Form success message */}
      {isSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your enquiry has been submitted successfully.</span>
        </div>
      )}

      {/* Enquiry form */}
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        {/* Student Name */}
        <div className="mb-4">
          <label htmlFor="studentName" className="block text-gray-700 text-sm font-bold mb-2">
            Student Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter student's name"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.studentName && <p className="text-red-500 text-xs">{errors.studentName}</p>}
        </div>

        {/* Parent Name */}
        <div className="mb-4">
          <label htmlFor="parentName" className="block text-gray-700 text-sm font-bold mb-2">
            Parent/Guardian Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Enter parent/guardian's name"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName}</p>}
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Class/Grade */}
        <div className="mb-4">
          <label htmlFor="classInterested" className="block text-gray-700 text-sm font-bold mb-2">
            Class/Grade Interested <span className="text-red-500">*</span>
          </label>
          <select
            id="classInterested"
            value={formData.classInterested}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Select a class/grade</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={`Class ${i + 1}`}>{`Class ${i + 1}`}</option>
            ))}
            <option value="Pre-Primary">Pre-Primary</option>
          </select>
          {errors.classInterested && <p className="text-red-500 text-xs">{errors.classInterested}</p>}
        </div>

        {/* Communication Mode */}
        <div className="mb-4">
          <label htmlFor="communicationMode" className="block text-gray-700 text-sm font-bold mb-2">
            Preferred Mode of Communication <span className="text-red-500">*</span>
          </label>
          <select
            id="communicationMode"
            value={formData.communicationMode}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Select a mode</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="In-Person">In-Person</option>
          </select>
          {errors.communicationMode && <p className="text-red-500 text-xs">{errors.communicationMode}</p>}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Enquiry Details/Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your enquiry details here..."
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;

