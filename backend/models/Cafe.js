const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ["study", "work", "friends", "date", "relax", "cheap", "instagram"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cafe", cafeSchema);