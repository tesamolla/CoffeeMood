const express = require("express");
const {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  getCafesByMood,
} = require("../controllers/cafeController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getCafes);

router.post("/", protect, createCafe);

router.get("/mood/:mood", getCafesByMood);

router.put("/:id", protect, updateCafe);

router.delete("/:id", protect, deleteCafe);

module.exports = router;