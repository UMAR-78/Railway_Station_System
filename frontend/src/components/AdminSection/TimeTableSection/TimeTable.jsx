import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TimeTable.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const TimeTable = () => {
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [station, setStations] = useState([]); // Updated variable name
  const [trains, setTrains] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTimeTableData, setEditTimeTableData] = useState({});
  const [editedTimeTable, setEditedTimeTable] = useState({
    trainId: "",
    originStationId: "",
    destinationStationId: "",
    departureTime: "",
    arrivalTime: "",
  });

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

  const fetchTimetableEntries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/api/v1/timeTables"
      );

      if (response.data.success) {
        console.log(response.data);
        setTimetableEntries(response.data.entriesWithImages); // Update the key here
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    fetchTrains();
    fetchStations();
    fetchTimetableEntries();
  }, []);

  // delete table------------------------------
  const handledeleteclick = async (entryId) => {
    console.log(entryId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/api/v1/delete/timeTable/${entryId}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    // fetchTrains();fetchTimetableEntries
    fetchTimetableEntries();
  };

  // ----------------Update Stations ----------------
  const handleUpdate = (entryId) => {
    const selectedTimeTable = timetableEntries.find(
      (timetableEntries) => timetableEntries._id.toString() === entryId
    );

    setEditTimeTableData(selectedTimeTable);
    setEditedTimeTable({
      trainId: selectedTimeTable.train.id,
      originStationId: selectedTimeTable.originStation.id,
      destinationStationId: selectedTimeTable.destinationStation.id,
      departureTime: selectedTimeTable.departureTime, // Set the actual value
      arrivalTime: selectedTimeTable.arrivalTime, // Set the actual value
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTimeTable({
      ...editedTimeTable,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e, entryId) => {
    e.preventDefault();

    // checking if any of the field is not empty
    for (const key in editedTimeTable) {
      if (editedTimeTable.hasOwnProperty(key) && !editedTimeTable[key]) {
        toast.error(`Please fill in the ${key} field.`);
        return; // Exit the function if any field is empty
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/admin/api/v1/update/timeTable/${entryId}`,
        editedTimeTable
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setShowEditModal(false);
        fetchTimetableEntries();
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container trainsection">
      <div className="uppersECTION">
        <h1>Train time table</h1>
        <Link to="/admin/addtimetable">
          <button className="addbutton">Add New TimeTable</button>
        </Link>
      </div>

      <div className="timetable-container">
        {timetableEntries.map((entry) => (
          <div key={entry._id} className="timetable-card">
            <img src={entry.image.url} alt="Timetable" />

            <div>
              <div className="iconcontainer">
                <MdDelete
                  className="deleteicon"
                  onClick={() => handledeleteclick(entry._id)}
                />
                <MdEdit
                  className="editicon"
                  onClick={() => handleUpdate(entry._id)}
                />
              </div>
              <h3>Train Name: {entry.train.name}</h3>
              <h5>From: {entry.originStation.name}</h5>
              <h5>To: {entry.destinationStation.name}</h5>
              <p>Departure: {new Date(entry.departureTime).toLocaleString()}</p>
              <p>Arrival: {new Date(entry.arrivalTime).toLocaleString()}</p>
              <p>Status: {entry.status}</p>
              <p>Seat Availability: {entry.seatAvailability}</p>
              <p>Total Fare: {entry.totalFare}</p>
            </div>
          </div>
        ))}
      </div>
      {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Station</h2>
            <form
              onSubmit={(e) => handleUpdateSubmit(e, editTimeTableData._id)}
            >
              {/* ------------------------ */}
              <label htmlFor="trainId">Train:</label>

              <div className="select-container">
                <select
                  className="select-styled"
                  name="trainId"
                  value={editedTimeTable.trainId}
                  onChange={handleEditInputChange}
                  required
                >
                  <option value="" disabled>
                    Select Train
                  </option>
                  {trains.map((train) => (
                    <option key={train._id} value={train._id}>
                      {train.trainName}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">&#9660;</div>
                <div className="select-options">
                  {trains.map((train) => (
                    <option key={train._id} value={train._id}>
                      {train.trainName}
                    </option>
                  ))}
                </div>
              </div>

              {/* ------------------------ */}
              <label htmlFor="originStationId">Origin Station:</label>
              <div className="selected-container">
                <select
                  className="select-styled"
                  name="originStationId"
                  value={editedTimeTable.originStationId}
                  onChange={handleEditInputChange}
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
              {/*-----------------------  */}
              <label htmlFor="destinationStationId">Destination Station:</label>
              <div className="selected-container">
                <select
                 className="select-styled"
                  name="destinationStationId"
                  value={editedTimeTable.destinationStationId}
                  onChange={handleEditInputChange}
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

              {/* -------------------------- */}
              <label htmlFor="departureTime">Departure Time:</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={editedTimeTable.departureTime}
                onChange={handleEditInputChange}
                required
              />
              <label htmlFor="arrivalTime">Arrival Time:</label>
              <input
                type="datetime-local"
                name="arrivalTime"
                value={editedTimeTable.arrivalTime}
                onChange={handleEditInputChange}
                required
              />

              <div>
                <button type="submit">Update</button>
                <button type="button" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTable;
