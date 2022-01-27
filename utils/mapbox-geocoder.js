const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mbxClient({"accessToken": process.env.MAPBOX_ACCESS_TOKEN});
const geocodingService = mbxGeocoding(baseClient);

module.exports.mpGeocode = async (query) => {
  var response = await geocodingService.forwardGeocode({'query': query, 'limit': 1 }).send();
  var feature0 = response.body.features[0];
  var formatedResp = [ {
      "formattedAddress": feature0.place_name,
      "latitude": feature0.center[1],
      "longitude": feature0.center[0],
      "country": null,
      "city": null,
      "stateCode": null,
      "zipcode": null,
      "streetName": null,
      "streetNumber": null,
      "countryCode": null,
      "provider": null
      } ];
  return formatedResp;
};