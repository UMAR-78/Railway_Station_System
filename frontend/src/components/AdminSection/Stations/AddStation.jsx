import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewStation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: "",
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
        "http://localhost:5000/admin/api/v1/station",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/stations");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Stations is already present");
    }
  };

  return (
    <>
      <div>
        <div className="TextSection">
          <h1>Add a New Station</h1>
          <p>Fill in the details to add a new station</p>
        </div>

        <form className="SearchForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formField">
              <label>Station Name</label>
              <input
                type="text"
                name="stationName"
                placeholder="Enter station name"
                value={formData.stationName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="formRow">
            <button type="submit">Add Station</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewStation;
