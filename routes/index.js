const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const scrapeController = require('./../controllers/scrapeController');

const router = express.Router();

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));

router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

// ========== Get Tags =========
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

// ========== Get LogInForm =========
router.get('/login', userController.loginForm);

// ========== Post LogInForm ========
router.post('/login', authController.login);

// ======== Private Pages ========
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/add', authController.isLoggedIn, storeController.addStore);

// ========== Get registerForm =========
router.get('/register', userController.registerForm);

router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
// ========= Addeded get Logout ========

router.get('/logout', authController.logout);

// ======== Added get account ========
router.get('/account', authController.isLoggedIn, userController.account);

// ======== Added post account ========
router.post('/account', catchErrors(userController.updateAccount));
// ======== Added post forgotPassword ========
router.post('/account/forgot', catchErrors(authController.forgotPassword));
// ========= Added get Reset =========
router.get('/account/reset/:token', catchErrors(authController.reset));
// ========= Added Post Reset =========
router.post(
  '/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
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

// Google Maps

router.get('/map', storeController.mapPage);

//
router.get(
  '/hearts',
  authController.isLoggedIn,
  catchErrors(storeController.getHearts)
);

//
router.post(
  '/reviews/:id',
  authController.isLoggedIn,
  catchErrors(reviewController.addReview)
);

router.get('/top', catchErrors(storeController.getTopStores));
/*

  API

*/

router.get('/api/v1/search', catchErrors(storeController.searchStores));
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));

// scrape web pages for data
router.get('/api/v1/scrape', scrapeController.scrapeStores);

// heart routes

router.get('/api/v1/search', catchErrors(storeController.searchStores));
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));
router.post(
  '/api/v1/stores/:id/heart',
  catchErrors(storeController.heartStore)
);

module.exports = router;
