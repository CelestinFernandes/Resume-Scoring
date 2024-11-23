import React, { useState } from "react";
import { AwardIcon, Home, Info, LineChart, LogOut, Menu, X } from "lucide-react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Import the useTheme hook

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();  // Use the theme context

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upload Resume", href: "/upload", icon: LineChart },
    { name: "History", href: "/history", icon: Info },
  ];

  return (
    <header className=" top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center space-x-2 text-xl font-bold hover:opacity-75">
            <AwardIcon className="text-black dark:text-white font-bold text-lg w-6" />
            <span className="text-black dark:text-white font-bold text-lg">ResumeScore</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                <span>{item.name}</span>
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gray-900 dark:via-white to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <FaMoon className="h-5 w-5" />
              ) : (
                <FaSun className="h-5 w-5" />
              )}
            </button>

            {/* Authentication Button */}
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Link to="/signin">Sign In</Link>
            </button>
          </div>

          {/* Mobile Header Section */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <FaMoon className="h-5 w-5" />
              ) : (
                <FaSun className="h-5 w-5" />
              )}
            </button>
            <button
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1 px-4 py-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ))}
        
              <div className="space-y-1">
                <Link
                  to="/signin"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
