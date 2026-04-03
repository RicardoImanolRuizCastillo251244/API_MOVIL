const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const pushCtrl = require("../controllers/pushController");

router.use(verifyToken);

// Alias para compatibilidad con cliente Android actual.
router.post("/token", pushCtrl.registerToken);

module.exports = router;

