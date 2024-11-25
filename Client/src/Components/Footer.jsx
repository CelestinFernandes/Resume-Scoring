import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ResumeScore</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A responsive single-page web application that allows users to upload PDF resumes for analysis and scoring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/upload" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/resume-scoring"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="mailto:contact@resumescore.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <FaEnvelope className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
