// import React from "react";

// const FeesPaymentReports = () => {
//   return (
//     <div className="min-h-screen bg-white text-black p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Fee Payment Report</h2>

//         <span className="text-xl text-gray-500">Academic Year: 2024–2025</span>
//       </div>

//       {/* Top Card */}
//       <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
//           <div className="space-y-2">
//             <label className="block font-medium">Search By</label>
//             <div className="space-y-1 text-sm">
//               <label className="block">
//                 <input type="radio" name="search" defaultChecked /> Admission No
//               </label>
//               <label className="block">
//                 <input type="radio" name="search" /> Student Name
//               </label>
//               <label className="block">
//                 <input type="radio" name="search" /> Father Name
//               </label>
//               <label className="block">
//                 <input type="radio" name="search" /> Phone No
//               </label>
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label className="block font-medium">Class</label>
//             <select className="border rounded w-full p-2">
//               <option>All Classes</option>
//             </select>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Find</button>
//           </div>

//           <div className="space-y-1 col-span-2">
//             <label className="block font-medium">Print Old Receipt</label>
//             <div className="flex items-center gap-2">
//               <input className="border rounded px-2 py-1 w-full" placeholder="Receipt No" />
//               <button className="bg-gray-700 text-white px-4 py-2 rounded">🖨️</button>
//             </div>
//             <div className="flex mt-2 gap-2">
//               <button className="bg-blue-600 text-white px-4 py-2 rounded">Current Students</button>
//               <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded">Old Students</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Date filter + actions */}
//       <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
//         <div className="flex gap-4">
//           <div>
//             <label className="block font-medium">From Date</label>
//             <input type="date" className="border rounded p-2" />
//           </div>
//           <div>
//             <label className="block font-medium">To Date</label>
//             <input type="date" className="border rounded p-2" />
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 mt-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded">Preview</button>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded">Print</button>
//           <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded">Export</button>
//         </div>
//       </div>

//       {/* Fee Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Yearly Fee</p>
//           <p className="text-lg font-bold text-blue-600">₹1,25,000</p>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Other Fee</p>
//           <p className="text-lg font-bold text-blue-600">₹15,000</p>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Cash</p>
//           <p className="text-lg font-bold text-blue-600">₹85,000</p>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Online</p>
//           <p className="text-lg font-bold text-blue-600">₹55,000</p>
//         </div>
//       </div>

//       {/* Expenses */}
//       <h3 className="text-lg font-semibold mb-2">Expenses</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Utility Bills</p>
//           <p className="text-lg font-bold text-blue-600">₹25,000</p>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Maintenance</p>
//           <p className="text-lg font-bold text-blue-600">₹15,000</p>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <p className="font-medium">Teacher Salary</p>
//           <p className="text-lg font-bold text-blue-600">₹1,85,000</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeesPaymentReports;
