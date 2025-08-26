import React from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      
      {/* Animated heading */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Flynest School
      </motion.h1>

      {/* Animated subheading */}
      <motion.p
        className="text-lg md:text-xl text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Manage Users, Students, and Classes effortlessly. Navigate through the dashboard to explore powerful features for smooth school management.
      </motion.p>

      {/* Animated buttons */}
      <motion.div
        className="mt-8 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
          Get Started
        </button>
        <button className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all">
          Learn More
        </button>
      </motion.div>

      {/* Floating icon animation */}
      <motion.div
        className="mt-12 w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Home;
