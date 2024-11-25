import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Toggle = () => {
  const location = useLocation();
  const isSignIn = location.pathname === '/signin';

  return (
    <div className="flex justify-center my-6">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex">
        <Link to="/signin">
          <motion.button
            className="relative px-4 py-2 rounded-full text-sm font-medium focus:outline-none"
            animate={{
              color: isSignIn ? "#fff" : "var(--color-text)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
            {isSignIn && (
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-400 -z-10"
                layoutId="toggle"
              />
            )}
          </motion.button>
        </Link>
        <Link to="/signup">
          <motion.button
            className="relative px-4 py-2 rounded-full text-sm font-medium focus:outline-none"
            animate={{
              color: !isSignIn ? "#fff" : "var(--color-text)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
            {!isSignIn && (
              <motion.div
                className="absolute inset-0 rounded-full bg-green-500 dark:bg-green-400 -z-10"
                layoutId="toggle"
              />
            )}
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Toggle;
