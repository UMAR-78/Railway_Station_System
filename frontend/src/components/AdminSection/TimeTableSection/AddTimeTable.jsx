import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addtimetable.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddTimetable = () => {
  const [formData, setFormData] = useState({
    trainId: "",
    originStationId: "",
    destinationStationId: "",
    departureTime: "",
    arrivalTime: "",
    file: null,
  });
  const navigate = useNavigate()

  const [station, setStations] = useState([]); // Updated variable name
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch stations
    const fetchStations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/api/v1/stations"
        );
        if (response.data.success) {
          setStations(response.data.station);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    // Fetch trains
    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/api/v1/trains"
        );
        if (response.data.success) {
          setTrains(response.data.trains);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    fetchStations();
    fetchTrains();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("trainId", formData.trainId);
    data.append("originStationId", formData.originStationId);
    data.append("destinationStationId", formData.destinationStationId);
    data.append("departureTime", formData.departureTime);
    data.append("arrivalTime", formData.arrivalTime);
    data.append("file", formData.file);

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/api/v1/timeTable",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("Timetable entry added successfully");
        toast.success(response.data.message);
        navigate("/admin/timetable")
      } else {
        console.error(response.data);
        toast.error(response.data.error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <>
      <div>
        <div className="TextSection">
          <h1>Add a New Time Table</h1>
          <p>Fill in the details to add a new time table</p>
        </div>

        <form className="SearchForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formField">
              <label htmlFor="file">Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                name="file"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label htmlFor="trainId">Train:</label>
              <select
                name="trainId"
                value={formData.trainId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Train
                </option>
                {trains.map(
                  (
                    train // Updated variable name
                  ) => (
                    <option key={train._id} value={train._id}>
                      {train.trainName}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label htmlFor="originStationId">Origin Station:</label>
              <select
                name="originStationId"
                value={formData.originStationId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Origin Station
                </option>
                {station.map(
                  (
                    station // Updated variable name
                  ) => (
                    <option key={station._id} value={station._id}>
                      {station.stationName}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="formField">
              <label htmlFor="destinationStationId">Destination Station:</label>
              <select
                name="destinationStationId"
                value={formData.destinationStationId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Destination Station
                </option>
                {station.map(
                  (
                    station // Updated variable name
                  ) => (
                    <option key={station._id} value={station._id}>
                      {station.stationName}
                    </option>
                  )
                )}
              </select>
            </div>


          <div className="formRow">
            <div className="formField">
              <label htmlFor="departureTime">Departure Time:</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="fromRow">
              <div className="formField">
                <label htmlFor="arrivalTime">Arrival Time:</label>
                <input
                  type="datetime-local"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit">Add Timetable Entry</button>
        </form>
      </div>
    </>
  );
};
export default AddTimetable;
