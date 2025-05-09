import React, { useState } from 'react';

const BonafideForm = ({ onCertificateAdded }) => {
  const [formData, setFormData] = useState({
    studentFullName: '',
    admissionNumber: '',
    className: '',
    section: '',
    academicYear: '2024-2025',
    issueDate: '',
    reason: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setIsSubmitting(true);
      
      const res = await fetch('https://school-management-server-yhtv.onrender.com/api/bonafide', {
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

      const newCertificate = await res.json();
      
      alert('✅ Certificate generated successfully!');
      
      // Reset form
      setFormData({
        studentFullName: '',
        admissionNumber: '',
        className: '',
        section: '',
        academicYear: '2024-2025',
        issueDate: '',
        reason: '',
      });
      
      // Notify parent component that a new certificate was added
      if (onCertificateAdded && typeof onCertificateAdded === 'function') {
        onCertificateAdded(newCertificate);
      }
    } catch (err) {
      console.error('Error generating certificate:', err);
      alert('❌ Error generating certificate');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Bonafide Certificate Form</h2>
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
          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="w-1/2 border rounded p-2"
            required
          >
            <option value="">Select Class</option>
            <option value="Class 1">Nursery</option>
            <option value="Class 1">PP1</option>
            <option value="Class 1">PP2</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
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
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() =>
              setFormData({
                studentFullName: '',
                admissionNumber: '',
                className: '',
                section: '',
                academicYear: '2024-2025',
                issueDate: '',
                reason: '',
              })
            }
            className="bg-gray-300 text-black px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating...' : 'Generate Certificate'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BonafideForm;