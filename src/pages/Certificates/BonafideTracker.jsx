import React, { useState, useEffect } from 'react';

const BonafideTracker = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/api/bonafide?page=${currentPage}&search=${searchQuery}&limit=${ITEMS_PER_PAGE}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setCertificates(data);
          setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.certificates)) {
            setCertificates(data.certificates);
            setTotalPages(Math.ceil((data.total || data.certificates.length) / ITEMS_PER_PAGE));
          } else if (Array.isArray(data.data)) {
            setCertificates(data.data);
            setTotalPages(Math.ceil((data.total || data.data.length) / ITEMS_PER_PAGE));
          } else if (Array.isArray(data.docs)) {
            setCertificates(data.docs);
            setTotalPages(Math.ceil((data.totalDocs || data.docs.length) / ITEMS_PER_PAGE));
          } else {
            const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              setCertificates(possibleArrays[0]);
              setTotalPages(Math.ceil(possibleArrays[0].length / ITEMS_PER_PAGE));
            } else {
              throw new Error('Could not find certificate data in the response');
            }
          }
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setError(`Failed to load certificates: ${error.message}`);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [currentPage, searchQuery]);

  const paginateCertificates = (allCerts) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allCerts.slice(startIndex, endIndex);
  };

  const displayedCertificates = paginateCertificates(certificates);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bonafide/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      setCertificates(certificates.filter(cert => cert._id !== id));
      alert('Certificate deleted successfully');
    } catch (error) {
      console.error('Error deleting certificate:', error);
      alert(`Failed to delete certificate: ${error.message}`);
    }
  };

  const handleDownload = (id) => {
    window.open(`http://localhost:5000/api/bonafide/download/${id}`, '_blank');
  };

  const handlePreview = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/bonafide/${id}`);
      
      if (!response.ok) {
        throw new Error(`Preview failed: ${response.status}`);
      }

      const data = await response.json();
      setPreviewData(data);
      setShowPreviewModal(true);
    } catch (error) {
      console.error('Error previewing certificate:', error);
      alert(`Failed to preview certificate: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewData(null);
  };

  const handleDownloadAllPDF = async () => {
    try {
      // Show loading indication
      setLoading(true);
      
      // Include search query if one exists
      const endpoint = searchQuery 
        ? `http://localhost:5000/api/bonafide/download/all?search=${encodeURIComponent(searchQuery)}`
        : 'http://localhost:5000/api/bonafide/download/all';
      
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'all_bonafide_certificates.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      
      // Hide loading indication
      setLoading(false);
    } catch (error) {
      console.error('Download all failed:', error);
      alert('Failed to download all certificates: ' + error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  // Preview Modal Component
  const PreviewModal = () => {
    if (!previewData) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-600">Certificate Preview</h3>
            <button 
              onClick={closePreviewModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="border-2 border-gray-300 p-6 rounded-lg bg-gray-50">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">BONAFIDE CERTIFICATE</h2>
              <p className="text-sm text-gray-600">Admission Number: {previewData.admissionNumber || 'N/A'}</p>
              <p className="text-sm text-gray-600">Date: {formatDate(previewData.issueDate)}</p>
            </div>
            
            <div className="space-y-4 text-gray-800">
              <p>This is to certify that <span className="font-bold">{previewData.studentFullName}</span>, 
                 Admission Number <span className="font-bold">{previewData.admissionNumber}</span>,
                 is a bonafide student of our institution studying in Class <span className="font-bold">{previewData.className}</span>,
                 Section <span className="font-bold">{previewData.section}</span>,
                 for the academic year <span className="font-bold">{previewData.academicYear || 'Current'}</span>.
              </p>
              
              {previewData.address && (
                <p>The student's address as per our records is: <span className="font-bold">{previewData.address}</span>.</p>
              )}
              
              {previewData.parentName && (
                <p>Parent/Guardian Name: <span className="font-bold">{previewData.parentName}</span></p>
              )}
              
              {previewData.reason && (
                <p>This certificate is issued for the purpose of: <span className="font-bold">{previewData.reason}</span>.</p>
              )}
              
              {previewData.additionalInfo && (
                <p>Additional Information: <span className="italic">{previewData.additionalInfo}</span></p>
              )}
            </div>
            
            <div className="mt-12 flex flex-col items-end">
              <p className="font-bold">Principal</p>
              <p>School Seal</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={closePreviewModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleDownload(previewData._id);
                closePreviewModal();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-blue-600 text-2xl font-bold mb-4">Bonafide Certificates</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by student name or admission number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-80 p-2 border rounded"
        />
        <button
          onClick={handleDownloadAllPDF}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 h-10"
          disabled={loading || certificates.length === 0}
        >
          {loading ? 'Processing...' : 'Download All as PDF'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p>Loading certificates...</p>
        </div>
      ) : (
        <>
          {displayedCertificates.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Student Name</th>
                      <th className="border p-2 text-left">Admission Number</th>
                      <th className="border p-2 text-left">Class</th>
                      <th className="border p-2 text-left">Section</th>
                      <th className="border p-2 text-left">Issue Date</th>
                      <th className="border p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedCertificates.map((certificate) => (
                      <tr key={certificate._id} className="hover:bg-gray-50">
                        <td className="border p-2">{certificate.studentFullName}</td>
                        <td className="border p-2">{certificate.admissionNumber}</td>
                        <td className="border p-2">{certificate.className}</td>
                        <td className="border p-2">{certificate.section}</td>
                        <td className="border p-2">
                          {formatDate(certificate.issueDate)}
                        </td>
                        <td className="border p-2">
                          <div className="flex flex-wrap gap-1">
                            <button
                              onClick={() => handlePreview(certificate._id)}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => handleDownload(certificate._id)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                              Download
                            </button>
                            <button
                              onClick={() => {
                                      if (window.confirm('Are you sure you want to delete this certificate?')) {
                                      handleDelete(certificate._id);}}}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-600 mb-4">No certificates found.</p>
              <p className="text-gray-500">
                Try adjusting your search criteria or add new certificates using the form.
              </p>
            </div>
          )}
        </>
      )}
      
      {showPreviewModal && <PreviewModal />}
    </div>
  );
};

export default BonafideTracker;