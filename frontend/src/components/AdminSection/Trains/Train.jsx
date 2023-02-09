import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "./Train.css";
import { Link } from "react-router-dom";

const Train = () => {
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

  useEffect(() => {
    fetchTrains();
  }, []);

  const [trains, setTrains] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTrainData, setEditTrainData] = useState({});
  const [editedTrain, setEditedTrain] = useState({
    trainName: "",
    trainNumber: "",
    type: "",
    capacity: "",
    baseFare: "",
    additionalCharges: "",
  });

  const handleDelete = async (trainId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/api/v1/delete/train/${trainId}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    fetchTrains();
  };

  const handleUpdate = (trainId) => {
    const selectedTrain = trains.find(
      (train) => train._id.toString() === trainId
    );
    setEditTrainData(selectedTrain);
    setEditedTrain({
      trainName: selectedTrain.trainName,
      trainNumber: selectedTrain.trainNumber,
      type: selectedTrain.type,
      capacity: selectedTrain.capacity,
      baseFare: selectedTrain.baseFare,
      additionalCharges: selectedTrain.additionalCharges,
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTrain({
      ...editedTrain,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e ,trainId) => {
    e.preventDefault()


    // checking if any of the field is not empty
    for (const key in editedTrain) {
      if (editedTrain.hasOwnProperty(key) && !editedTrain[key]) {
        toast.error(`Please fill in the ${key} field.`);
        return; // Exit the function if any field is empty
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/admin/api/v1/update/train/${trainId}`,
        editedTrain
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setShowEditModal(false);
        fetchTrains();
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
    <div className="container trainsection">
      <div className="uppersECTION">
        <h1>All Trains</h1>
        <Link to="/admin/addtrain">
          <button className="addbutton">Add New Train</button>
        </Link>
      </div>
      <div className="train-container">
        {trains.map((train) => (
          <div key={train._id} className="train-card">
            <h2>{train.trainName}</h2>
            <p>Train Number: {train.trainNumber}</p>
            <p>Type: {train.type}</p>
            <p>Capacity: {train.capacity}</p>
            <p>Base Fare: {train.baseFare}</p>
            <p>Additional Charges: {train.additionalCharges}</p>

            <div className="icon-container">
              <MdEdit
                className="update-icon"
                onClick={() => handleUpdate(train._id)}
              />
              <MdDelete
                className="delete-icon"
                onClick={() => handleDelete(train._id)}
              />
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Train</h2>
            <form onSubmit={(e) => handleUpdateSubmit(e ,editTrainData._id)}>
              <label>Train Name:</label>
              <input
                type="text"
                name="trainName"
                value={editedTrain.trainName}
                onChange={handleEditInputChange}
              />
              <label>Train Number:</label>
              <input
                type="text"
                name="trainNumber"
                value={editedTrain.trainNumber}
                onChange={handleEditInputChange}
              />
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={editedTrain.type}
                onChange={handleEditInputChange}
              />
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={editedTrain.capacity}
                onChange={handleEditInputChange}
              />
              <label>Base Fare:</label>
              <input
                type="number"
                name="baseFare"
                value={editedTrain.baseFare}
                onChange={handleEditInputChange}
              />
              <label>Additional Charges:</label>
              <input
                type="number"
                name="additionalCharges"
                value={editedTrain.additionalCharges}
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

export default Train;
