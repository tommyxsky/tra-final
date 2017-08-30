const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/add', storeController.addStore);
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));


module.exports = router;
