const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');
// ========== Import userController =========
const userController = require('./../controllers/userController');
// ========== Import authController =========
const authController = require('./../controllers/authController');

const router = express.Router();

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));

router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/add', storeController.addStore);
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

// ========== Get Tags =========
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

// ========== Get LogInForm =========
router.get('/login', userController.loginForm);

// ========== Get registerForm =========
router.get('/register', userController.registerForm);

router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.post(
  '/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post(
  '/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

module.exports = router;
