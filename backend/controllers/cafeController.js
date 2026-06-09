const Cafe = require("../models/Cafe");

const getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find().populate("createdBy", "name email");
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCafe = async (req, res) => {
  try {
    const cafe = await Cafe.create({
      ...req.body,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json(cafe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!cafe) {
      return res.status(404).json({ message: "Cafe not found" });
    }

    res.json(cafe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndDelete(req.params.id);

    if (!cafe) {
      return res.status(404).json({ message: "Cafe not found" });
    }

    res.json({ message: "Cafe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCafesByMood = async (req, res) => {
  try {
    const cafes = await Cafe.find({ mood: req.params.mood });
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  getCafesByMood,
};