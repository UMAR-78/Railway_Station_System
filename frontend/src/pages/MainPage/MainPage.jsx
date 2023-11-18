import React from 'react'
import HeroSection from "../../components/Hero/Hero";
import SearchSection from "../../components/Search/Search";
import Destination from "../../components/TravelDestinations/Destination";
import Footer from '../../components/Footer/Footer';


const MainPage = () => {
  return (
    <>
    <HeroSection/>
    <SearchSection/>
    <Destination/>
    {/* <Footer/> */}
    </>
  )
}

export default MainPage