import React from 'react'
import HeroSection from "../../components/Hero/Hero";
import SearchSection from "../../components/Search/Search";
import Destination from "../../components/TravelDestinations/Destination";
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
  
  
  return (
    <>
    <HeroSection/>
    <SearchSection/>
    <Destination/>
    </>
  )
}

export default MainPage