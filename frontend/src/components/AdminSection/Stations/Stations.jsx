import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Stations.css";

const Stations = () => {
  const [station, setStations] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStationData, setEditStationData] = useState({});
  const [editedStation, setEditedStation] = useState({
    stationName: "",
  });

  const fetchStations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/api/v1/stations"
      );
      if (response.data.success) {
        console.log(response.data);
        setStations(response.data.station);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleDelete = async (stationId) => {
    console.log(stationId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/api/v1/station/delete/${stationId}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    fetchStations();
  };
  // ----------------Update Stations ----------------
  const handleUpdate = (stationId) => {
    const selectedStation = station.find(
      (station) => station._id.toString() === stationId
    );
    setEditStationData(selectedStation);
    setEditedStation({
      stationName: selectedStation.stationName,
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStation({
      ...editedStation,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e, trainId) => {
    e.preventDefault();

    // checking if any of the field is not empty
    for (const key in editedStation) {
      if (editedStation.hasOwnProperty(key) && !editedStation[key]) {
        toast.error(`Please fill in the ${key} field.`);
        return; // Exit the function if any field is empty
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/admin/api/v1/station/update/${trainId}`,
        editedStation
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setShowEditModal(false);
        fetchStations();
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      toast.error("Train number is already in use");
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container stationsection">
      <div className="uppersECTION">
        <h1>All Stations</h1>
        <Link to="/admin/addstation">
          <button className="addbutton">Add New Station</button>
        </Link>
      </div>
      <table className="station-table">
        <thead>
          <tr>
            <th>Station Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {station &&
            station.map((station, index) => (
              <tr key={index}>
                <td>{station.stationName}</td>
                <td>
                  <MdEdit
                    className="update-icon"
                    onClick={() => handleUpdate(station._id)}
                  />
                  <MdDelete
                    className="delete-icon"
                    onClick={() => handleDelete(station._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Station</h2>
            <form onSubmit={(e) => handleUpdateSubmit(e, editStationData._id)}>
              <label>Station Name:</label>
              <input
                type="text"
                name="stationName"
                value={editedStation.stationName}
                onChange={handleEditInputChange}
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

export default Stations;
