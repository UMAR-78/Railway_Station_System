import React from 'react';
import HeroSection from '../../components/Hero/Hero';
import SearchSection from '../../components/Search/Search';
import Destination from '../../components/TravelDestinations/Destination';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // If no user or user is not an admin, do not render HeroSection
  if (!user || user.role !== 'admin') {
    return (
      <>
      <HeroSection />
        <SearchSection />
        <Destination />
        <Footer />
      </>
    );
  }

  // If user is an admin, render HeroSection
  return (
    <>
      <HeroSection />
      {/* <SearchSection /> */}
      {/* <Destination /> */}
      <Footer />
    </>
  );
};

export default MainPage;
