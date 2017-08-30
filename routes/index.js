const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

// Do work here
router.get('/', storeController.homePage);
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/add', storeController.addStore);
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
// router.get('/', catchErrors(storeController.getStores));

module.exports = router;
