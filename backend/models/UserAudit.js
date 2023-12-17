// import mongoose from "mongoose";

const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    oldValue: {
      type: Object,
      required: true,
    },
    newValue: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const UserAudit = mongoose.model("UserAudit", schema);

module.exports = UserAudit;
