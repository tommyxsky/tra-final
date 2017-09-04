const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');
// ========== Import userController =========
const userController = require('./../controllers/userController');

const router = express.Router();

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// ========== Get Tags =========

router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
// ========== Get LogInForm =========
router.get('/login', userController.loginForm);
// ========== Get registerForm =========
router.get('/register', userController.registerForm);
// ========== Post validateRegister =========
router.post('/register', userController.validateRegister);

module.exports = router;
