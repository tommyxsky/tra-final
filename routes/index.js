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
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// ========== Get Tags =========

router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
// ========== Get LogInForm =========
router.get('/login', userController.loginForm);
// ========== Post LogInForm ========
router.post('/login', authController.login);
// ======== As if logged in ========
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/add', authController.isLoggedIn, storeController.addStore);
// ========== Get registerForm =========
router.get('/register', userController.registerForm);
// ========== Post validateRegister with controller pointer Updated for Login =========
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
//========= Addeded get Logout ========
router.get('/logout', authController.logout);

module.exports = router;
