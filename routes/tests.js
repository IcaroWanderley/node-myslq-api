const express = require('express');
const testController = require('../controllers/test.controller'); // Ensure this path is correct

const router = express.Router();

router.get("/associations", testController.test);

module.exports = router;