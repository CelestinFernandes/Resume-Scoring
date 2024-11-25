// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const History = () => {
//   const [historyData, setHistoryData] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch history data from the backend API
//   useEffect(() => {
//     async function fetchHistory() {
//       const authToken = localStorage.getItem('authToken');
//       if (!authToken) {
//         setError('You need to Sign-In to see your history.');
//         return;
//       }

//       try {
//         const response = await fetch("/api/history", {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setHistoryData(data);
//         } else {
//           setError('Failed to fetch history');
//         }
//       } catch (err) {
//         console.error("Failed to fetch history:", err);
//         setError('Something went wrong. Please try again later.');
//       }
//     }

//     fetchHistory();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//       <h1 className="text-3xl font-bold text-center mb-6">History</h1>
      
//       {/* Center the error message if there's an error */}
//       {error && (
//         <div className="flex justify-center items-center min-h-[300px]">
//           <p className="text-red-500 text-lg">{error}</p>
//         </div>
//       )}

//       <div className="container mx-auto px-4 py-8">
//         {historyData.length > 0 ? (
//           <div className="space-y-5">
//             {historyData.map((item) => (
//               <div
//                 key={item._id}
//                 className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
//               >
//                 <div className="flex-1 text-center md:text-left">
//                   <p className="font-medium text-lg">{item.fileName}</p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Submitted on: {new Date(item.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div className="flex items-center my-4 md:my-0">
//                   <div
//                     className={`text-white text-lg font-semibold px-4 py-2 rounded-lg ${
//                       item.score < 50
//                         ? "bg-red-500"
//                         : item.score < 75
//                         ? "bg-orange-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     Score: {item.score}
//                   </div>
//                 </div>

//                 <div className="flex-1 text-center md:text-left">
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Suggestions: {item.suggestions}
//                   </p>
//                 </div>

//                 <div className="mt-4 md:mt-0">
//                   <a
//                     href="#"
//                     className="text-blue-500 hover:text-blue-600 dark:text-blue-400 font-medium mr-4"
//                   >
//                     Download
//                   </a>
//                   {/* Delete functionality */}
//                   {/* For future implementation of delete */}
//                   <button
//                     // onClick={() => handleDelete(item.id)}
//                     className="text-red-500 hover:text-red-600 dark:text-red-400 font-medium"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center">
//             <p className="text-gray-600 dark:text-gray-400">
//               No history found. Upload a resume to get started!
//             </p>
//             <Link
//               to="/upload"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4 inline-block"
//             >
//               Upload Resume
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default History;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Download, Trash2, ChevronDown, ChevronUp, FileText } from "lucide-react";

// const History = () => {
//   const [historyData, setHistoryData] = useState([]);
//   const [error, setError] = useState('');
//   const [expandedItem, setExpandedItem] = useState(null);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       console.log('Fetching history...');
//       const response = await fetch("/api/history");
//       console.log('Response status:', response.status);
      
//       const textResponse = await response.text();
//       console.log('Raw response:', textResponse);
      
//       if (response.ok) {
//         try {
//           const data = JSON.parse(textResponse);
//           console.log('Parsed data:', data);
//           setHistoryData(data);
//         } catch (parseError) {
//           console.error('JSON parsing error:', parseError);
//           setError('Invalid response format from server');
//         }
//       } else {
//         setError(`Failed to fetch history: ${textResponse}`);
//       }
//     } catch (err) {
//       console.error("Failed to fetch history:", err);
//       setError('Something went wrong. Please try again later.');
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/history/${id}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         setHistoryData(prevData => prevData.filter(item => item._id !== id));
//       } else {
//         setError('Failed to delete item');
//       }
//     } catch (err) {
//       console.error("Failed to delete:", err);
//       setError('Failed to delete item');
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 75) return "bg-green-500";
//     if (score >= 50) return "bg-orange-500";
//     return "bg-red-500";
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Resume Analysis History</h1>
//           <Link
//             to="/upload"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
//           >
//             Upload New Resume
//           </Link>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {historyData.length > 0 ? (
//           <div className="space-y-4">
//             {historyData.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
//               >
//                 {/* Header Section */}
//                 <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center space-x-3">
//                     <FileText className="w-6 h-6 text-gray-500" />
//                     <div>
//                       <h3 className="font-medium text-lg">{item.filename}</h3>
//                       <p className="text-sm text-gray-500">
//                         {new Date(item.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Scores Section */}
//                   <div className="flex items-center space-x-4 my-4 md:my-0">
//                     <div className={`${getScoreColor(item.Score)} text-white px-3 py-1 rounded-full font-medium`}>
//                       Overall: {item.Score}%
//                     </div>
//                     <button
//                       onClick={() => setExpandedItem(expandedItem === item._id ? null : item._id)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       {expandedItem === item._id ? <ChevronUp /> : <ChevronDown />}
//                     </button>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex space-x-4">
//                     <button 
//                       className="text-blue-500 hover:text-blue-600 flex items-center"
//                       onClick={() => window.open(`/api/history/${item._id}/download`)}
//                     >
//                       <Download className="w-5 h-5 mr-1" />
//                       Download
//                     </button>
//                     <button 
//                       className="text-red-500 hover:text-red-600 flex items-center"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       <Trash2 className="w-5 h-5 mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 {/* Expanded Details */}
//                 {expandedItem === item._id && (
//                   <div className="p-4 bg-gray-50 dark:bg-gray-800">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                       <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
//                         <h4 className="font-medium mb-2">Relevance Score</h4>
//                         <div className={`${getScoreColor(item.scoringDetails.relevanceScore)} text-white px-3 py-1 rounded-full text-center`}>
//                           {item.scoringDetails.relevanceScore}%
//                         </div>
//                       </div>
//                       <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
//                         <h4 className="font-medium mb-2">Sections Score</h4>
//                         <div className={`${getScoreColor(item.scoringDetails.sectionsScore)} text-white px-3 py-1 rounded-full text-center`}>
//                           {item.scoringDetails.sectionsScore}%
//                         </div>
//                       </div>
//                       <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
//                         <h4 className="font-medium mb-2">Formatting Score</h4>
//                         <div className={`${getScoreColor(item.scoringDetails.formattingScore)} text-white px-3 py-1 rounded-full text-center`}>
//                           {item.scoringDetails.formattingScore}%
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <h4 className="font-medium mb-2">Strengths</h4>
//                         <ul className="list-disc pl-5 space-y-1">
//                           {item.scoringDetails.summary.strengths.map((strength, index) => (
//                             <li key={index} className="text-green-600 dark:text-green-400">
//                               {strength}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div>
//                         <h4 className="font-medium mb-2">Areas for Improvement</h4>
//                         <ul className="list-disc pl-5 space-y-1">
//                           {item.scoringDetails.summary.weaknesses.map((weakness, index) => (
//                             <li key={index} className="text-red-600 dark:text-red-400">
//                               {weakness}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <h4 className="font-medium mb-2">Detailed Analysis</h4>
//                       <div className="space-y-2">
//                         <p><strong>Job Relevance:</strong> {item.scoringDetails.criteriaExplanation.relevanceToJob}</p>
//                         <p><strong>Section Analysis:</strong> {item.scoringDetails.criteriaExplanation.keySections}</p>
//                         <p><strong>Formatting Analysis:</strong> {item.scoringDetails.criteriaExplanation.formatting}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
//               No resume analysis history found
//             </p>
//             <Link
//               to="/upload"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium inline-block"
//             >
//               Upload Your First Resume
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default History;



import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000';

const ResumeHistory = () => {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/resumes`);
        if (!response.ok) {
          throw new Error('Failed to fetch resumes');
        }
        const data = await response.json();
        setResumes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Uploaded Resumes</h2>

        {error && (
          <p className="text-red-500 mb-4">
            <strong>Error:</strong> {error}
          </p>
        )}

        {resumes.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No resumes uploaded yet.</p>
        )}

        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="p-4 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <h3 className="font-bold text-lg">{resume.filename}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Job Description:</strong> {resume.JD}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Score:</strong> {resume.Score}%
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Relevance Score:</strong> {resume.scoringDetails.relevanceScore}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Summary:</strong> {resume.scoringDetails.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeHistory;
