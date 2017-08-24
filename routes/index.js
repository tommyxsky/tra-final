const express = require('express');
const storeController = require('./../controllers/storeController');

const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

router.get('/', storeController.homePage);

module.exports = router;
