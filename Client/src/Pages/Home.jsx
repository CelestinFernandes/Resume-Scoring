import React from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaChartLine, FaFileDownload } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl text-center px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-500">ResumeScore</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Effortlessly analyze your resume and get personalized feedback to improve your chances of landing your dream job. Upload your resume now and get started!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/upload" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
            Upload Resume
          </Link>
          <Link to="/about" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium">
            Learn More
          </Link>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaUpload className="text-3xl text-blue-500" />}
            title="Upload Your Resume"
            description="Easily drag and drop your PDF resume or use the file upload option."
          />
          <FeatureCard
            icon={<FaChartLine className="text-3xl text-green-500" />}
            title="Get Your Score"
            description="Analyze your resume and receive a score along with actionable insights."
          />
          <FeatureCard
            icon={<FaFileDownload className="text-3xl text-yellow-500" />}
            title="Download Reports"
            description="Save a detailed PDF report of your resume analysis for future reference."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default Home;
