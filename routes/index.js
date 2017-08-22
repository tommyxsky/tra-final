const express = require('express');
// controllers needed?
const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
