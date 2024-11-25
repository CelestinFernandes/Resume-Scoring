import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaFile, FaTimes } from 'react-icons/fa';

const API_URL = 'http://localhost:5000';

const Upload = () => {
  const [files, setFiles] = useState([]); // Use an array to store multiple files
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [saveHistory, setSaveHistory] = useState(false); // State to track if user wants to save history
  const navigate = useNavigate();

  // Check if the user is authenticated (For example, checking token in localStorage)
  const isAuthenticated = !!localStorage.getItem('authToken'); // Replace with your auth check

  const validateFile = useCallback((file) => {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return false;
    } else if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return false;
    }
    return true;
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(validateFile);
    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setError('');
    }
  }, [validateFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 5 * 1024 * 1024,
    multiple: true, // Allow multiple file uploads
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file before uploading.');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter the job description.');
      return;
    }

    setIsUploading(true);
    setError('');


    const formData = new FormData();
    files.forEach((file) => formData.append('resumes', file));  // Append all selected files
    formData.append('jobDescription', jobDescription); // Add job description to formData

    // If the user wants to save history, we will add the flag to the formData
    if (saveHistory && isAuthenticated) {
      formData.append('saveHistory', 'true');
    }

    try {
      const response = await fetch(`${API_URL}/api/resume/analyze`, { //need to change
        method: 'POST',
        body: formData,
      });

      console.log("running",response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');


      }
      const fileNameWithExtension = files[0].name;  // Get the name of the first file
      const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.');  // Remove the extension
      const result = await response.json();
      console.log('Upload successful:', result);
      navigate(`/results/${fileName}`); // Redirect to the results page using the result ID
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Upload Resume</h2>

        {/* Job Description Input */}
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description"
          rows={4}
          className="w-full p-2 mb-4 border rounded-md bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        {/* Toggle to Save History */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={saveHistory}
              onChange={() => setSaveHistory((prev) => !prev)}
              className="h-5 w-5 text-blue-500"
            />
            <span className="text-gray-600 dark:text-gray-400">Save upload history</span>
          </label>
        </div>

        {/* Check if the user is authenticated and wants to save history */}
        {!isAuthenticated && saveHistory && (
          <div className="text-center text-red-500 mb-4">
            <p>You must be signed in to save upload history.</p>
            <button
              onClick={() => navigate('/signin')}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Go to Sign-In
            </button>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="mx-auto text-4xl mb-4 text-gray-400 dark:text-gray-600" />
          {isDragActive ? (
            <p className="text-blue-500">Drop the PDF file(s) here</p>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag and drop your PDF resume(s) here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                or click to select files
              </p>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            {files.map((file, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaFile className="text-blue-500 mr-3" />
                  <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFile(file)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove file"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500">
            <strong>Error:</strong> {error}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={isUploading || files.length === 0 || !jobDescription}
          className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Upload Resume(s)'
          )}
        </button>
      </div>
    </div>
  );
};

export default Upload;
