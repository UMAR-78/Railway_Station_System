import React, { useState } from "react";
import "./Destination.css";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Destination = () => {
  const navigate = useNavigate();

  const [timetableEntries, setTimetableEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(1); // Default to 1 seat

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTimetableEntries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/api/v1/timeTables"
      );

      if (response.data.success) {
        setTimetableEntries(response.data.entriesWithImages);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    fetchTimetableEntries();
  }, []);

  const handleBookNowClick = (entry) => {
    // Set the selected entry when "Book Now" is clicked
    setSelectedEntry(entry);
  };

  const handlePayment = () => {
    if (user) {
      console.log(`Processing payment for ${numberOfSeats} seat(s)`);
      toast.success("PAYMENT SUCCESSFUL");
      setSelectedEntry(null);
    }
    if (!user) {
      navigate("/signin");
    }
  };

  const handleCloseModal = () => {
    // Close the modal when the user cancels the payment
    setSelectedEntry(null);
  };

  return (
    <div className="container">
      <div className="upperSection">
        <h5>Top travel destinations</h5>
      </div>
      <div className="timetable-container">
        {timetableEntries.map((entry) => (
          <div key={entry._id} className="timetable-card">
            <img src={entry.image.url} alt="Timetable" />

            <div>
              <h3>Train Name: {entry.train.name}</h3>
              <h5>From: {entry.originStation.name}</h5>
              <h5>To: {entry.destinationStation.name}</h5>
              <p>Departure: {new Date(entry.departureTime).toLocaleString()}</p>
              <p>Arrival: {new Date(entry.arrivalTime).toLocaleString()}</p>
              <p>Seat Availability: {entry.seatAvailability}</p>
              <p>Total Fare: {entry.totalFare}</p>

              {/* Add the "Book Now" button with an onClick event */}
              <button
                className="booknow"
                onClick={() => handleBookNowClick(entry)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {selectedEntry && (
        <div className="payment-modal">
          <h2>Payment Details</h2>
          <p>Train: {selectedEntry.train.name}</p>
          <p>Total Fare: {selectedEntry.totalFare * numberOfSeats}</p>
          <label>
            Number of Seats:
            <input
              type="number"
              min="1"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(e.target.value)}
            />
          </label>
          <button onClick={handlePayment}>Pay Now</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Destination;
