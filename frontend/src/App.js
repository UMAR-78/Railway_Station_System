import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/MainPage/MainPage";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Contact from "./components/Contact/Contact";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";
import UserProfile from "./components/UserProfile/UserProfile";
import ChangePassword from "./components/UserProfile/ChangePassword";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import Train from "./components/AdminSection/Trains/Train";
import Stations from "./components/AdminSection/Stations/Stations";
import TimeTable from "./components/AdminSection/TimeTableSection/TimeTable";
import AddTrain from "./components/AdminSection/Trains/AddTrain";
import AddNewStation from "./components/AdminSection/Stations/AddStation";
import AddTimetable from "./components/AdminSection/TimeTableSection/AddTimeTable";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />

            <Route path="/resetpassword/:token" element={<ResetPassword />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Admin part */}

            <Route path="/admin/train" element={<Train />} />
            <Route path="/admin/stations" element={<Stations />} />
            <Route path="/admin/timetable" element={<TimeTable />} />
            <Route path="/admin/addtrain" element={<AddTrain />} />
            <Route path="/admin/addstation" element={<AddNewStation />} />
            <Route path="/admin/addtimetable" element={<AddTimetable />} />


          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
