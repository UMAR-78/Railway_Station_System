const Train = require("../models/trainModel");

// Add train
const addTrain = async (req, res) => {
  try {
    const {
      trainName,
      trainNumber,
      type,
      capacity,
      baseFare,
      additionalCharges,
    } = req.body;

    // check if train is already exists
    const isTrain = await Train.findOne({trainNumber});
    if (isTrain) {
      return res.status(409).json({
        success: false,
        message: "Train already exists",
      });
    }

    const train  = await Train.create(req.body)
    return res.status(200).json({
      success: true,
      message: "Created",
      train,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// delete train
const deleteTrain = async (req, res) => {
    try {
      // Check if the station exists
      const train = await Train.findById(req.params.id);
      if (!train) {
        return res.status(404).json({ message: "Train not found" });
      }
  
      // Delete the station
      await Train.findOneAndDelete();
      return res.status(200).json({
        success: true,
        message: "Deleted",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//   UPDATE train

const updateTrain = async (req, res) => {
    try {
      const istrain = await Train.findById(req.params.id)
      if(!istrain)
      {
        return res.status(404).json(
          {
            success:false,
            message:"Train not found"
          }
        )
      }
  
      const updatetrain = await Train.findByIdAndUpdate(req.params.id , req.body , 
        {
          new:true,
        })
  
        return res.status(200).json(
          {
            success:true,
            message:"Updated",
            updatetrain
          }
        )
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
// Get all trains
const getAllTrains = async(req , res)=>
{
  try {
      const trains = await Train.find()
      if(!trains || trains.length ===0)
      {
       return res.status(404).json({
          success:false,
          message:"No trains found"
        })
      }
     return res.status(200).json({
        success: true,
        message: 'Trains retrieved successfully',
        trains,
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
  addTrain,
  deleteTrain,
  updateTrain,
  getAllTrains
};
