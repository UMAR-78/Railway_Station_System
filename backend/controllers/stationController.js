const Station = require("../models/stationsModel");

// Add new station-----------------------------------------------------------------------
const AddNewStation = async (req, res) => {
  try {
    const { stationName } = req.body;
    if (!stationName) {
      return res.status(404).json({
        success: false,
        message: "Please enter station name!!!",
      });
    }

    // check if staion already exists

    const isExists = await Station.findOne({ stationName });
    if (isExists) {
      return res.status(409).json({
        success: false,
        message: "Station already exists!!!",
      });
    }

    const staion = await Station.create({
      stationName: stationName,
    });
    return res.status(200).json({
      success: true,
      message: "New Staion added successfully!!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating new Staion!!",
      error: error,
    });
  }
};

// Delete station-----------------------------------------------------------------------------
const deleteStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Delete the station
    await Station.findOneAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Staion--------------------------------------------------------------------------------
const updateStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id)
    if(!station)
    {
      return res.status(404).json(
        {
          success:false,
          message:"Station not found"
        }
      )
    }

    const updatestation = await Station.findByIdAndUpdate(req.params.id , req.body , 
      {
        new:true,
      })

      return res.status(200).json(
        {
          success:true,
          message:"Updated",
          updatestation
        }
      )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// get all stations


const getAllStations = async(req , res)=>
{
  try {
      const station = await Station.find()
      if(!station || station.length ===0)
      {
       return res.status(404).json({
          success:false,
          message:"No stations found"
        })
      }
     return res.status(200).json({
        success: true,
        message: 'Stations retrieved successfully',
        station,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      // station,
    });
  }
}

module.exports = {
  AddNewStation,
  deleteStation,
  updateStation,
  getAllStations
};
