const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const healthController = require('../controllers/healthController');
const authMiddleware = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route
router.get('/me', authMiddleware, authController.getMe);

// Optional: DB test route
router.get('/test', healthController.testDB);

module.exports = router;