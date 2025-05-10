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
  const [photoPreview, setPhotoPreview] = useState(null);
  const stepFields = [
    ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'gender', 'bloodGroup'],
    ['grade', 'section', 'academicYear', 'admissionNumber', 'rollNumber', 'totalFees'],
    ['parentName', 'relationship', 'phoneNumber', 'emailAddress', 'address'],
    ['studentPhoto', 'birthCertificate', 'previousMarksheet', 'transferCertificate']
  ];
  const FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const FILE_SIZE_PDF = 5 * 1024 * 1024; // 5MB

  const formik = useFormik({
    initialValues: {
      firstName: '', middleName: '', lastName: '',
      dateOfBirth: '', gender: '', bloodGroup: '',
      grade: '', section: '', academicYear: '', rollNumber: '', admissionNumber: '', totalFees: '',
      parentName: '', relationship: '', phoneNumber: '', emailAddress: '', address: '',
      studentPhoto: '', birthCertificate: '', previousMarksheet: '', transferCertificate: '',
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
        .test('fileSize', 'File too large', (value) => {
          return value instanceof File && value.size <= FILE_SIZE;
        })

        .test('fileType', 'Unsupported format', (value) => {
          return value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
      birthCertificate: Yup.mixed()
        .required('Birth certificate is required')
        .test('fileSize', 'File too large', (value) => {
          return value instanceof File && value.size <= FILE_SIZE;
        })

        .test('fileType', 'Unsupported format', (value) => {
          return value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
      previousMarksheet: Yup.mixed()
        .required('Previous marksheet is required')
        .test('fileSize', 'File too large', (value) => {
          return value instanceof File && value.size <= FILE_SIZE;
        })

        .test('fileType', 'Unsupported format', (value) => {
          return value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
      transferCertificate: Yup.mixed()
        .required('Transfer certificate is required')
        .test('fileSize', 'File too large', (value) => {
          return value instanceof File && value.size <= FILE_SIZE;
        })

        .test('fileType', 'Unsupported format', (value) => {
          return value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
    }),

    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      }

      try {
        const response = await axios.post('http://localhost:5000/api/Newregistration/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Student Registered Successfully!');
        formik.resetForm();
        setPhotoPreview(null);
        setStep(0);
      } catch (error) {
        console.error(error);
        alert('Failed to register student!');
      }
    },
  });

  const inputClass = "border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const sections = [
    <div key="personal">
      <h3 className="text-lg font-semibold mb-2 mt-7">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input type="text" placeholder="First name" {...formik.getFieldProps('firstName')} className={inputClass} />
          {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-sm">{formik.errors.firstName}</div>}
        </div>
        <div><input type="text" placeholder="Middle name (optional)" {...formik.getFieldProps('middleName')} className={inputClass} /></div>
        <div>
          <input type="text" placeholder="Last name" {...formik.getFieldProps('lastName')} className={inputClass} />
          {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-sm">{formik.errors.lastName}</div>}
        </div>
        <div>
          <input type="date" {...formik.getFieldProps('dateOfBirth')} className={inputClass} />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && <div className="text-red-500 text-sm">{formik.errors.dateOfBirth}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('gender')} className={inputClass}>
            <option value="">Select gender</option><option>Male</option><option>Female</option>
          </select>
          {formik.touched.gender && formik.errors.gender && <div className="text-red-500 text-sm">{formik.errors.gender}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('bloodGroup')} className={inputClass}>
            <option value="">Select blood group</option><option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
          </select>
          {formik.touched.bloodGroup && formik.errors.bloodGroup && <div className="text-red-500 text-sm">{formik.errors.bloodGroup}</div>}
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
          {formik.touched.grade && formik.errors.grade && <div className="text-red-500 text-sm">{formik.errors.grade}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('section')} className={inputClass}>
            <option value="">Select section</option><option>A</option><option>B</option><option>C</option>
          </select>
          {formik.touched.section && formik.errors.section && <div className="text-red-500 text-sm">{formik.errors.section}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('academicYear')} className={inputClass}>
            <option value="">Select academic year</option>
            {['2024-2025', '2025-2026', '2026-2027'].map((year) => <option key={year}>{year}</option>)}
          </select>
          {formik.touched.academicYear && formik.errors.academicYear && <div className="text-red-500 text-sm">{formik.errors.academicYear}</div>}
        </div>
        <div>
          <input type="text" placeholder="Admission Number" {...formik.getFieldProps('admissionNumber')} className={inputClass} />
          {formik.touched.admissionNumber && formik.errors.admissionNumber && <div className="text-red-500 text-sm">{formik.errors.admissionNumber}</div>}
        </div>
        <div>
          <input type="text" placeholder="Roll number" {...formik.getFieldProps('rollNumber')} className={inputClass} />
          {formik.touched.rollNumber && formik.errors.rollNumber && <div className="text-red-500 text-sm">{formik.errors.rollNumber}</div>}
        </div>
        <div>
          <input type="text" placeholder="Total Fees" {...formik.getFieldProps('totalFees')} className={inputClass} />
          {formik.touched.totalFees && formik.errors.totalFees && <div className="text-red-500 text-sm">{formik.errors.totalFees}</div>}
        </div>
      </div>
    </div>,

    <div key="contact">
      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input type="text" placeholder="Parent/Guardian Name" {...formik.getFieldProps('parentName')} className={inputClass} />
          {formik.touched.parentName && formik.errors.parentName && <div className="text-red-500 text-sm">{formik.errors.parentName}</div>}
        </div>
        <div>
          <select {...formik.getFieldProps('relationship')} className={inputClass}>
            <option value="">Select relationship</option><option>Father</option><option>Mother</option><option>Guardian</option>
          </select>
          {formik.touched.relationship && formik.errors.relationship && <div className="text-red-500 text-sm">{formik.errors.relationship}</div>}
        </div>
        <div>
          <input type="text" placeholder="Phone number" {...formik.getFieldProps('phoneNumber')} className={inputClass} />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>}
        </div>
        <div>
          <input type="email" placeholder="Email address" {...formik.getFieldProps('emailAddress')} className={inputClass} />
          {formik.touched.emailAddress && formik.errors.emailAddress && <div className="text-red-500 text-sm">{formik.errors.emailAddress}</div>}
        </div>
      </div>
      <div className="mt-4">
        <textarea placeholder="Address" {...formik.getFieldProps('address')} className={inputClass} rows="3" />
        {formik.touched.address && formik.errors.address && <div className="text-red-500 text-sm">{formik.errors.address}</div>}
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
          {formik.touched.studentPhoto && formik.errors.studentPhoto && (
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
          {formik.touched.birthCertificate && formik.errors.birthCertificate && (
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
              formik.setFieldValue('marksheet', file);
              setFilePreviews((prev) => ({
                ...prev,
                marksheet: file ? URL.createObjectURL(file) : null,
              }));
            }}
            className={inputClass}
          />
          <div className="text-gray-500 text-sm mt-1">
            Supported formats: JPG, JPEG, PNG. Max size: 2MB.
          </div>
          {filePreviews.marksheet && (
            <img
              src={filePreviews.marksheet}
              alt="Marksheet"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
          {formik.touched.marksheet && formik.errors.marksheet && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.marksheet}
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
          {formik.touched.transferCertificate && formik.errors.transferCertificate && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.transferCertificate}
            </div>
          )}
        </div>
      </div>
    </div>

  ];

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow max-w-5xl mx-auto space-y-6 mt-8">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Student Registration</h2>

      {/* Render current section */}
      {sections[step]}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Previous
          </button>
        )}
        {step < sections.length - 1 ? (
          <button
            type="button"
            onClick={async () => {
              const fieldsToValidate = stepFields[step];

              // Set touched for current fields
              const touched = {};
              fieldsToValidate.forEach(field => touched[field] = true);
              formik.setTouched(touched, true);

              // Delay a tick to let Formik update state
              setTimeout(async () => {
                const errors = await formik.validateForm();
                const hasErrors = fieldsToValidate.some(field => errors[field]);
                if (!hasErrors) {
                  nextStep();
                }
              }, 0);
            }}


            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>

        ) : (
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Register Student
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentRegistrationForm;