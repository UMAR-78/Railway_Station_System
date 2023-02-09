const Train = require("../models/trainModel");
const Station = require("../models/stationsModel");
const TimetableEntry = require("../models/trainTimeTableModel");
const { getDatauri } = require("../utils/dataurl");
const cloudinary = require("cloudinary");

const addNewTimeTable = async (req, res) => {
  try {
    const {
      trainId,
      originStationId,
      destinationStationId,
      departureTime,
      arrivalTime,
    } = req.body;

    // Check if the origin and destination stations are the same
    if (originStationId === destinationStationId) {
      return res
        .status(400)
        .json({ error: "Origin and destination stations must be different" });
    }

    // Check if both origin and destination station IDs exist in the database

    const originStation = await Station.findById(originStationId);
    const destinationStation = await Station.findById(destinationStationId);

    if (!originStation || !destinationStation) {
      return res
        .status(400)
        .json({ error: "Invalid origin or destination stations" });
    }

    // Fetch the train details to get maxSeats
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train with this id is not found",
      });
    }

    // Validate departure and arrival times
    const departureDateTime = new Date(departureTime);
    const arrivalDateTime = new Date(arrivalTime);

    if (departureDateTime >= arrivalDateTime) {
      return res
        .status(400)
        .json({ error: "Departure time must be before arrival time" });
    }

    // Check if the train is already scheduled during the specified time range
    const existingEntries = await TimetableEntry.find({
      train: { id: trainId },
      $or: [
        {
          $and: [
            { departureTime: { $lte: departureDateTime } },
            { arrivalTime: { $gte: departureDateTime } },
          ],
        },
        {
          $and: [
            { departureTime: { $lte: arrivalDateTime } },
            { arrivalTime: { $gte: arrivalDateTime } },
          ],
        },
        {
          $and: [
            { departureTime: { $gte: departureDateTime } },
            { arrivalTime: { $lte: arrivalDateTime } },
          ],
        },
      ],
    });

    if (existingEntries.length > 0) {
      return res.status(400).json({
        error: "Train is already scheduled during the specified time range",
      });
    }
    // Check seat availability
    const totalSeatsOccupied = existingEntries.reduce(
      (total, entry) => total + entry.seatAvailability,
      0
    );

    const availableSeats = train.capacity - totalSeatsOccupied;

    if (availableSeats <= 0) {
      return res
        .status(400)
        .json({ error: "No available seats for this timetable entry" });
    }

    // to upload file
    const file = req.file;
    // console.log(file)

    const fileUri = getDatauri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // Create a timetable entry
    const timetableEntry = new TimetableEntry({
      train: {
        id: trainId,
        name: train.trainName,
      },
      originStation: {
        id: originStationId,
        name: originStation.stationName,
      },
      destinationStation: {
        id: destinationStationId,
        name: destinationStation.stationName,
      },
      departureTime: departureDateTime,
      arrivalTime: arrivalDateTime,
      status: "Scheduled",
      seatAvailability: train.capacity, // Set seatAvailability based on train's maxSeats
      maxSeats: train.capacity,
      totalFare: train.baseFare + train.additionalCharges,
      image: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    // Save the timetable entry to the database
    const savedTimetable = await timetableEntry.save();

    res.status(201).json({
      success: true,
      message: "Saved successfully",
      savedTimetable,
    });
  } catch (error) {
    console.error("Error creating timetable entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all timetable entries with images
const getAllTimeTables = async (req, res) => {
  try {
    const allTimeTables = await TimetableEntry.find();

    // Map the entries to include image URLs
    const entriesWithImages = allTimeTables.map((entry) => {
      return {
        ...entry._doc,
        image: {
          public_id: entry.image.public_id,
          url: entry.image.url,
        },
      };
    });

    // console.log(entriesWithImages)

    return res.status(200).json({
      success: true,
      message: "Retrieved successfully",
      entriesWithImages,
    });
  } catch (error) {
    console.error("Error fetching all timetable entries:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTimeTable = async (req, res) => {
  try {
    const timeTableID = req.params.id;
    const {
      trainId,
      originStationId,
      destinationStationId,
      departureTime,
      arrivalTime,
    } = req.body;

    // Parse departureTime and arrivalTime into Date objects
    const departureDateTime = new Date(departureTime);
    const arrivalDateTime = new Date(arrivalTime);

    // Check if the origin and destination stations are the same
    if (originStationId === destinationStationId) {
      return res
        .status(400)
        .json({ error: "Origin and destination stations must be different" });
    }

    // Check if both origin and destination station IDs exist in the database
    const originStation = await Station.findById(originStationId);
    const destinationStation = await Station.findById(destinationStationId);

    if (!originStation || !destinationStation) {
      return res
        .status(400)
        .json({ error: "Invalid origin or destination station ID" });
    }

    // Fetch the train details to get maxSeats
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train with this id is not found",
      });
    }

    // Create a timetable entry
    const timetableEntry = await TimetableEntry.findByIdAndUpdate(
      timeTableID,
      {
        train: {
          id: trainId,
          name: train.trainName,
        },
        originStation: {
          id: originStationId,
          name: originStation.stationName,
        },
        destinationStation: {
          id: destinationStationId,
          name: destinationStation.stationName,
        },
        departureTime: departureDateTime,
        arrivalTime: arrivalDateTime,
        seatAvailability: train.capacity,
        maxSeats: train.capacity,
        totalFare: train.baseFare + train.additionalCharges,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Updated",
      timetableEntry,
    });
  } catch (error) {
    console.error("Error updating timetable entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete timetable entry by ID
const deleteTimeTable = async (req, res) => {
  try {
    const timeTable = await TimetableEntry.findById(req.params.id);
    if (!timeTable) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    const deleteTimeTable = await TimetableEntry.findOneAndDelete(
      req.params.id
    );
    if (deleteTimeTable) {
      return res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// -------------------------------------------------------------------------
module.exports = {
  addNewTimeTable,
  getAllTimeTables,
  updateTimeTable,
  deleteTimeTable,
};
