import React, { useState } from "react";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function FeesPaymentForm() {
  const [searchBy, setSearchBy] = useState("admission");
  const [studentFound, setStudentFound] = useState(null); // Initially set to null
  const [searchInput, setSearchInput] = useState("");
  const [studentDetails, setStudentDetails] = useState(null); // Store student details
  const [searchError, setSearchError] = useState("");

  const resetAll = () => {
    setStudentFound(null); // Reset studentFound to null on reset
    setSearchInput("");
    setStudentDetails(null); // Reset student details
    setSearchError("");
    formik.resetForm();
  };

  const handleFind = async () => {
    setSearchError(""); // clear previous error
  
    if (searchInput.trim() === "") {
      setSearchError(
        searchBy === "admission"
          ? "Please enter an admission number"
          : "Please enter a student name"
      );
      setStudentFound(null);
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/api/students/search', {
        params: {
          admissionNumber: searchBy === "admission" ? searchInput.trim() : undefined,
          studentName: searchBy === "student" ? searchInput.trim() : undefined
        }
      });
  
      // Adjust depending on whether your backend returns an array or single object
      const student = Array.isArray(response.data.students)
        ? response.data.students[0]
        : response.data.student;
  
      if (student) {
        const { firstName, middleName, lastName, admissionNumber } = student;
        const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
  
        setStudentDetails({
          fullName,
          admissionNumber,
        });
        setStudentFound(true);
      } else {
        setStudentFound(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setStudentFound(false);
    }
  };
  

  const formik = useFormik({
    initialValues: {
      feeType: 'Tuition Fee',
      paymentDate: new Date().toISOString().split('T')[0],
      amount: '',
      paymentMethod: 'Cash',
      remarks: '',
    },
    validationSchema: Yup.object({
      feeType: Yup.string().required('Fee type is required'),
      paymentDate: Yup.date().required('Payment date is required'),
      amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
      paymentMethod: Yup.string().required('Payment method is required'),
      remarks: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const paymentData = {
        studentName: studentDetails.fullName,
        admissionNumber: studentDetails.admissionNumber,
        ...values,
      };
    
      try {
        const response = await axios.post('http://localhost:5000/api/fees/payment', paymentData);
        console.log('Response from backend:', response.data); 
    
        if (response.status === 200) {
          alert('Payment processed successfully');
          resetAll();
        }
      } catch (error) {
        console.error('Error processing payment:', error); // ← add this log
        alert('Error processing payment: ' + error.message);
      }
    },
});

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Fee Payment</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-2">
  <div className="flex flex-col sm:flex-row sm:items-end gap-4">
    {/* Radio options section */}
    <div className="flex flex-col">
      <label className="font-medium text-xl mr-4 ">Search By</label><br></br>
      <div className="flex items-center gap-6 p-1 text-lg">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="searchBy"
            value="admission"
            checked={searchBy === "admission"}
            onChange={() => setSearchBy("admission")}
          /> Admission No
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="searchBy"
            value="student"
            checked={searchBy === "student"}
            onChange={() => setSearchBy("student")}
          /> Student Name
        </label>
      </div>
    </div>

    {/* Search input section - will appear inline on sm screens and below on mobile */}
    <div className="flex-1">
      <input
        className="border rounded-lg p-2 text-base w-full"
        placeholder={searchBy === "admission" ? "Enter Admission No..." : "Enter Student Name..."}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      /></div>
          {searchError && (
            <div className="text-red-600 text-sm mt-1">{searchError}</div>
          )}
        </div>
      </div><br></br>

      <div className="mb-4 ">
        <button
          onClick={handleFind}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl gap- "
        >
          Find
        </button>
      </div>

      {studentFound === true ? (
        <>
          <div className="mb-4 text-lg font-medium text-green-600">
            Student Found: {studentDetails.fullName}  (Admission Number:{studentDetails.admissionNumber})
          </div>

          <form onSubmit={formik.handleSubmit} className="bg-white border border-blue-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fee Type</label>
              <select
                name="feeType"
                className="border rounded-lg p-2 w-full"
                value={formik.values.feeType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option>Tuition Fee</option>
                <option>Admission Fee</option>
                <option>Lab Fee</option>
              </select>
              {formik.touched.feeType && formik.errors.feeType ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.feeType}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                className="border rounded-lg p-2 w-full"
                value={formik.values.paymentDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={new Date().toISOString().split('T')[0]}
              />
              {formik.touched.paymentDate && formik.errors.paymentDate ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.paymentDate}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                className="border rounded-lg p-2 w-full"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.amount && formik.errors.amount ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.amount}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                className="border rounded-lg p-2 w-full"
                value={formik.values.paymentMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option>Cash</option>
                <option>Online</option>
                <option>Cheque</option>
              </select>
              {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.paymentMethod}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Remarks</label>
              <textarea
                name="remarks"
                className="border rounded-lg p-2 w-full"
                rows="2"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.remarks && formik.errors.remarks ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.remarks}</div>
              ) : null}
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-2">
              <button
                type="button"
                className="bg-gray-200 text-black py-2 px-6 rounded-xl"
                onClick={resetAll}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl"
              >
                Process Payment
              </button>
            </div>
          </form>
        </>
      ) : studentFound === false ? (
        <div className="text-red-600 mb-4">No student found.</div>
      ) : null}
    </div>
  );
}
