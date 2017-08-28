const express = require('express');
const storeController = require('./../controllers/storeController');
// controllers needed?
const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'The Retail Apocalypse' });
});

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
