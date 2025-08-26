import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <> 
    <Toaster position="top-right" />
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
