import React from 'react';
import { AwardIcon, Clock, Mail, File } from 'lucide-react';
import { IoLogoGithub } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <AwardIcon className="h-6 w-6" />
              <span className="text-xl font-bold">ResumeScore</span>
            </Link>
            <p className="text-sm text-muted-foreground">
                A responsive single-page web application that allows users to upload PDF resumes for analysis and scoring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/upload" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <File className="h-6 w-6" /> <span>Upload Resume</span>
                </Link>
              </li>
              <li>
                <Link to="/history" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <Clock className="h-6 w-6" /> <span>History</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/CelestinFernandes/Resume-Scoring.git" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <IoLogoGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:celestin.fernandes21@st.niituniversity.in" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scoring System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}