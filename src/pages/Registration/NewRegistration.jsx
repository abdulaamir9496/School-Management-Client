import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const StudentRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [filePreviews, setFilePreviews] = useState({
    studentPhoto: null,
    birthCertificate: null,
    previousMarksheet: null,
    transferCertificate: null,
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [admissionNumberError, setAdmissionNumberError] = useState('');

  const stepFields = [
    ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'gender', 'bloodGroup'],
    ['grade', 'section', 'academicYear', 'admissionNumber', 'rollNumber', 'totalFees'],
    ['parentName', 'relationship', 'phoneNumber', 'emailAddress', 'address'],
    ['studentPhoto', 'birthCertificate', 'previousMarksheet', 'transferCertificate']
  ];
  
  const FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const checkAdmissionNumber = async (admissionNumber) => {
  if (!admissionNumber) return;

  try {
    const response = await axios.get('http://localhost:5000/api/Newregistration/check-admission-number', {
      params: { admissionNumber },
    });

    // If the admission number exists, show an error message
    if (response.data.exists) {
      setAdmissionNumberError('Admission number already exists.');
    } else {
      setAdmissionNumberError('');
    }
  } catch (error) {
    console.error('Error checking admission number:', error);
    setAdmissionNumberError('Error checking admission number');
  }
};

  const formik = useFormik({
    initialValues: {
      firstName: '', middleName: '', lastName: '',
      dateOfBirth: '', gender: '', bloodGroup: '',
      grade: '', section: '', academicYear: '', rollNumber: '', admissionNumber: '', totalFees: '',
      parentName: '', relationship: '', phoneNumber: '', emailAddress: '', address: '',
      studentPhoto: null, birthCertificate: null, previousMarksheet: null, transferCertificate: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      middleName: Yup.string(),
      lastName: Yup.string().required('Last name is required'),
      dateOfBirth: Yup.string().required('Date of Birth is required'),
      gender: Yup.string().required('Gender is required'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      grade: Yup.string().required('Grade is required'),
      section: Yup.string().required('Section is required'),
      academicYear: Yup.string().required('Academic Year is required'),
      rollNumber: Yup.string().required('Roll Number is required'),
      admissionNumber: Yup.string().matches(/^\d{5}$/, 'Admission number must be 5 digits').required('Admission Number is required'),
      totalFees: Yup.number().typeError('Total Fees must be a number').required('Total Fees is required'),
      parentName: Yup.string().required('Parent/Guardian name is required'),
      relationship: Yup.string().required('Relationship is required'),
      phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
      emailAddress: Yup.string().email('Invalid email address').required('Email is required'),
      address: Yup.string().required('Address is required'),
      studentPhoto: Yup.mixed()
        .required('Student photo is required')
        .test('fileSize', 'File too large', (value) => !value || (value && value.size <= FILE_SIZE))
        .test('fileType', 'Unsupported format', (value) => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))),
      birthCertificate: Yup.mixed()
        .required('Birth certificate is required')
        .test('fileSize', 'File too large', (value) => !value || (value && value.size <= FILE_SIZE))
        .test('fileType', 'Unsupported format', (value) => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))),
      previousMarksheet: Yup.mixed()
        .required('Previous marksheet is required')
        .test('fileSize', 'File too large', (value) => !value || (value && value.size <= FILE_SIZE))
        .test('fileType', 'Unsupported format', (value) => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))),
      transferCertificate: Yup.mixed()
        .required('Transfer certificate is required')
        .test('fileSize', 'File too large', (value) => !value || (value && value.size <= FILE_SIZE))
        .test('fileType', 'Unsupported format', (value) => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      const formData = new FormData();
      
      // Add all form values to FormData
      for (let key in values) {
        if (values[key] !== null && values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      }

      try {
        const response = await axios.post('http://localhost:5000/api/Newregistration/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        console.log("Registration response:", response.data);
        alert('Student Registered Successfully!');
        
        // Reset form and state
        formik.resetForm();
        setFilePreviews({
          studentPhoto: null,
          birthCertificate: null,
          previousMarksheet: null,
          transferCertificate: null,
        });
        setStep(0);
        setAttemptedSubmit(false);
      } catch (error) {
        console.error("Registration error:", error);
        alert('Failed to register student! ' + (error.response?.data?.message || error.message));
      }
    },
  });

  // Only show validation errors if field has been touched or form submission was attempted
  const shouldShowError = (fieldName) => {
    return (formik.touched[fieldName] || attemptedSubmit) && formik.errors[fieldName];
  };

  const inputClass = "border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const sections = [
    <div key="personal">
      <h3 className="text-lg font-semibold mb-2 mt-7">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input type="text" placeholder="First name" {...formik.getFieldProps('firstName')} className={inputClass} />
          {shouldShowError('firstName') && <div className="text-red-500 text-sm">{formik.errors.firstName}</div>}
        </div>
        <div>
          <input type="text" placeholder="Middle name (optional)" {...formik.getFieldProps('middleName')} className={inputClass} />
        </div>
        <div>
          <input type="text" placeholder="Last name" {...formik.getFieldProps('lastName')} className={inputClass} />
          {shouldShowError('lastName') && <div className="text-red-500 text-sm">{formik.errors.lastName}</div>}
        </div>
        <div>
          <input type="date" {...formik.getFieldProps('dateOfBirth')} className={inputClass} max={new Date().toISOString().split('T')[0]} />
          {shouldShowError('dateOfBirth') && <div className="text-red-500 text-sm">{formik.errors.dateOfBirth}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('gender')} className={inputClass}>
            <option value="">Select gender</option><option>Male</option><option>Female</option>
          </select>
          {shouldShowError('gender') && <div className="text-red-500 text-sm">{formik.errors.gender}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('bloodGroup')} className={inputClass}>
            <option value="">Select blood group</option><option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
          </select>
          {shouldShowError('bloodGroup') && <div className="text-red-500 text-sm">{formik.errors.bloodGroup}</div>}
        </div>
      </div>
    </div>,

    <div key="academic">
      <h3 className="text-lg font-semibold mb-2">Academic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <select {...formik.getFieldProps('grade')} className={inputClass}>
            <option value="">Select class</option>
            {['Nursery', 'PP1', 'PP2', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>
          {shouldShowError('grade') && <div className="text-red-500 text-sm">{formik.errors.grade}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('section')} className={inputClass}>
            <option value="">Select section</option><option>A</option><option>B</option><option>C</option>
          </select>
          {shouldShowError('section') && <div className="text-red-500 text-sm">{formik.errors.section}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('academicYear')} className={inputClass}>
            <option value="">Select academic year</option>
            {['2024-2025', '2025-2026', '2026-2027'].map((year) => <option key={year}>{year}</option>)}
          </select>
          {shouldShowError('academicYear') && <div className="text-red-500 text-sm">{formik.errors.academicYear}</div>}
        </div>
        <div>
          <input type="text" placeholder="Admission Number" {...formik.getFieldProps('admissionNumber')} className={inputClass} onChange={(e) => {
    formik.handleChange(e);
    checkAdmissionNumber(e.target.value);  // Trigger the check for uniqueness
  }} />
  {admissionNumberError && <div className="text-red-500 text-sm">{admissionNumberError}</div>}
   {formik.touched.admissionNumber && formik.errors.admissionNumber && (
        <div className="text-red-500 text-sm">{formik.errors.admissionNumber}</div>
      )}
          
        </div>
        <div>
          <input type="text" placeholder="Roll number" {...formik.getFieldProps('rollNumber')} className={inputClass} />
          {shouldShowError('rollNumber') && <div className="text-red-500 text-sm">{formik.errors.rollNumber}</div>}
        </div>
        <div>
          <input type="text" placeholder="Total Fees" {...formik.getFieldProps('totalFees')} className={inputClass} />
          {shouldShowError('totalFees') && <div className="text-red-500 text-sm">{formik.errors.totalFees}</div>}
        </div>
      </div>
    </div>,

    <div key="contact">
      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input type="text" placeholder="Parent/Guardian Name" {...formik.getFieldProps('parentName')} className={inputClass} />
          {shouldShowError('parentName') && <div className="text-red-500 text-sm">{formik.errors.parentName}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('relationship')} className={inputClass}>
            <option value="">Select relationship</option><option>Father</option><option>Mother</option><option>Guardian</option>
          </select>
          {shouldShowError('relationship') && <div className="text-red-500 text-sm">{formik.errors.relationship}</div>}
        </div>
        <div>
          <input type="text" placeholder="Phone number" {...formik.getFieldProps('phoneNumber')} className={inputClass} />
          {shouldShowError('phoneNumber') && <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>}
        </div>
        <div>
          <input type="email" placeholder="Email address" {...formik.getFieldProps('emailAddress')} className={inputClass} />
          {shouldShowError('emailAddress') && <div className="text-red-500 text-sm">{formik.errors.emailAddress}</div>}
        </div>
      </div>
      <div className="mt-4">
        <textarea placeholder="Address" {...formik.getFieldProps('address')} className={inputClass} rows="3" />
        {shouldShowError('address') && <div className="text-red-500 text-sm">{formik.errors.address}</div>}
      </div>
    </div>,

    <div key="documents">
      <h3 className="text-lg font-semibold mb-2">Documents & Photos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Student Photo</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('studentPhoto', file);
              setFilePreviews((prev) => ({
                ...prev,
                studentPhoto: file ? URL.createObjectURL(file) : null,
              }));
            }}
            className={inputClass}
          />
          <div className="text-gray-500 text-sm mt-1">
            Supported formats: JPG, JPEG, PNG. Max size: 2MB.
          </div>
          {filePreviews.studentPhoto && (
            <img
              src={filePreviews.studentPhoto}
              alt="Student Photo"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
          {shouldShowError('studentPhoto') && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.studentPhoto}</div>
          )}
        </div>

        <div>
          <label>Birth Certificate</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('birthCertificate', file);
              setFilePreviews((prev) => ({
                ...prev,
                birthCertificate: file ? URL.createObjectURL(file) : null,
              }));
            }}
            className={inputClass}
          />
          <div className="text-gray-500 text-sm mt-1">
            Supported formats: JPG, JPEG, PNG. Max size: 2MB.
          </div>
          {filePreviews.birthCertificate && (
            <img
              src={filePreviews.birthCertificate}
              alt="Birth Certificate"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
          {shouldShowError('birthCertificate') && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.birthCertificate}
            </div>
          )}
        </div>

        <div>
          <label>Previous Marksheet</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('previousMarksheet', file);
              setFilePreviews((prev) => ({
                ...prev,
                previousMarksheet: file ? URL.createObjectURL(file) : null, 
              }));
            }}
            className={inputClass}
          />
          <div className="text-gray-500 text-sm mt-1">
            Supported formats: JPG, JPEG, PNG. Max size: 2MB.
          </div>
          {filePreviews.previousMarksheet && (
            <img
              src={filePreviews.previousMarksheet}
              alt="Previous Marksheet"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
          {shouldShowError('previousMarksheet') && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.previousMarksheet}
            </div>
          )}
        </div>

        <div>
          <label>Transfer Certificate</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('transferCertificate', file);
              setFilePreviews((prev) => ({
                ...prev,
                transferCertificate: file ? URL.createObjectURL(file) : null,
              }));
            }}
            className={inputClass}
          />
          <div className="text-gray-500 text-sm mt-1">
            Supported formats: JPG, JPEG, PNG. Max size: 2MB.
          </div>
          {filePreviews.transferCertificate && (
            <img
              src={filePreviews.transferCertificate}
              alt="Transfer Certificate"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
          {shouldShowError('transferCertificate') && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.transferCertificate}
            </div>
          )}
        </div>
      </div>
    </div>
  ];

  const validateStep = async (stepIndex) => {
    const fieldsToValidate = stepFields[stepIndex];
    const errors = await formik.validateForm();
    
    // Only validate current step fields
    return fieldsToValidate.some(field => errors[field]);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow max-w-5xl mx-auto space-y-6 mt-8">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Student Registration</h2>

      {/* Render current section */}
      {sections[step]}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button 
            type="button" 
            onClick={prevStep} 
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        {step < sections.length - 1 ? (
          <button
            type="button"
            onClick={async () => {
              const stepHasErrors = await validateStep(step);
              
              // Only mark fields as touched if there are errors
              if (stepHasErrors || admissionNumberError) {
                const fieldsToTouch = {};
                stepFields[step].forEach(field => {
                  fieldsToTouch[field] = true;
                });
                formik.setTouched({...formik.touched, ...fieldsToTouch});
              } else {
                nextStep();
              }
            }} 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button 
            type="button" 
            onClick={() => {
              setAttemptedSubmit(true);
              formik.handleSubmit();
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Register Student
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentRegistrationForm;