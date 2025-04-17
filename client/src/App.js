// src/App.js
import React from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import AIQuizPage from "./pages/AIQuizPage";
import Profile from "./pages/Profile";

function App() {
  const isLogin = localStorage.getItem("isLogin") === "true";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ai-quiz" element={<AIQuizPage />} />
          <Route 
            path="/profile" 
            element={
              isLogin ? <Profile /> : <Navigate to="/login" />
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;