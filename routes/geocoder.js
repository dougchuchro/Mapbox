const express = require('express');
const { geocode, mpGeocode } = require('../controllers/geocoder');

const router = express.Router();

router
  .route('/')
  .get(geocode)
  .post(mpGeocode);

module.exports = router;
