// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import TakeQuiz from "./pages/TakeQuiz";
import Profile from "./pages/Profile";
import QuizGenerator from "./pages/QuizGenerator";
import MyQuizzes from "./pages/MyQuizzes";

function App() {
  /*const isLogin = localStorage.getItem("isLogin") === "true";*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/take-quiz" element={<TakeQuiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/quiz-generator/:type" element={<QuizGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;