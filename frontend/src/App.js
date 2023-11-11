import React from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/Hero";
import SearchSection from "./components/Search/Search";
import Destination from "./components/TravelDestinations/Destination";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Add more routes for other pages if needed */}
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
