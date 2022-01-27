const nodeGeocoder = require('../utils/geocoder');
const mapboxGeocoder = require('../utils/mapbox-geocoder');

// @desc  Geocode address using Provider: MapQuest
// @route GET /api/v1/geocoder
// @access Public
exports.geocode = async (req, res, next) => {
  var response = await nodeGeocoder.geocode(req.body.address);
  return res.status(200).json({
    success: true,
    data: response
  });
};

// @desc  Geocode address using Provider: Mapbox
// @route POST /api/v1/geocoder
// @access Public
exports.mpGeocode = async (req, res, next) => {
  var response = await mapboxGeocoder.mpGeocode(req.body.address);
  return res.status(200).json({
    success: true,
    data: response
  });
};
