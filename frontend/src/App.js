import React from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/Hero/Hero";
import SearchSection from "./components/Search/Search";
import Destination from "./components/TravelDestinations/Destination";
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn'

function App() {
  return (
    <>
      <Header/>
      <HeroSection/>
      <div className="Separator"></div>
      <SearchSection/>
      <Destination/>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
