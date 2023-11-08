import React from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/Hero";
import SearchSection from "./components/Search/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header/>
      <HeroSection/>
      <div className="Separator"></div>
      <SearchSection/>
      <div className="Separator"></div>
      <Router>
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
