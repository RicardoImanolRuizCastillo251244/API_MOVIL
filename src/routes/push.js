const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const pushCtrl = require("../controllers/pushController");

router.use(verifyToken);

router.post("/token", pushCtrl.registerToken);
router.post("/test", pushCtrl.sendTest);

module.exports = router;

