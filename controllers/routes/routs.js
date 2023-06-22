const express = require('express');
const router = express.Router();

const surveyController = require('../controllers/surveyController');
const userController = require('../controllers/userController');

// Surveys Routes
router.post('/', surveyController.createSurvey);
router.get('/:id', surveyController.getSurvey);

// Users Routes
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
