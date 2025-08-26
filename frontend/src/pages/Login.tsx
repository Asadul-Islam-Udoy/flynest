import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/forms/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding / Illustration */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 justify-center items-center"
      >
        <div className="text-center text-white px-8">
          <h1 className="text-4xl font-extrabold mb-4">Flynest School</h1>
          <p className="text-lg">
            Manage students, teachers, and classes with ease.
          </p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex w-full md:w-1/2 justify-center items-center bg-gray-50"
      >
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>
          <LoginForm />
          {/* <div className="text-center mt-6">
            <span className="text-gray-500">Don't have an account? </span>
            <a
              href="/signup"
              className="text-purple-600 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
