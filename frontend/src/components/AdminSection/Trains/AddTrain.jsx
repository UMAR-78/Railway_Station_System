import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewTrain = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    type: "Express",
    capacity: "",
    baseFare: "",
    additionalCharges: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/api/v1/train",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // console.log("Train added successfully:", data.train);
        toast.success(response.data.message);
        navigate("/admin/train");
      }
    } catch (error) {
      console.error("Error:", error.message);
       toast.error("This train number is already in use");
    }
  };

  return (
    <>
      <div>
        <div className="TextSection">
          <h1>Add a New Train</h1>
          <p>Fill in the details to add a new train</p>
        </div>

        <form className="SearchForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formField">
              <label>Train Number:</label>
              <input
                type="text"
                name="trainNumber"
                placeholder="Enter train number"
                value={formData.trainNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formField">
              <label>Train Name:</label>
              <input
                type="text"
                name="trainName"
                placeholder="Enter train name"
                value={formData.trainName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="Express">Express</option>
                <option value="Local">Local</option>
              </select>
            </div>
            <div className="formField">
              <label>Capacity:</label>
              <input
                type="number"
                name="capacity"
                placeholder="Enter capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Base Fare:</label>
              <input
                type="number"
                name="baseFare"
                placeholder="Enter base fare"
                value={formData.baseFare}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formField">
              <label>Additional Charges:</label>
              <input
                type="number"
                name="additionalCharges"
                placeholder="Enter additional charges"
                value={formData.additionalCharges}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="formRow">
            <button type="submit">Add Train</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewTrain;
