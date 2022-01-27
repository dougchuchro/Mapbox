mapboxgl.accessToken =
  "pk.eyJ1IjoiZG91Z2NodWNocm8iLCJhIjoiY2t4MWpvaWdkMGNkazJ3dGppOTFydGt5bSJ9.k4BXQsC91FuP41BAcN4KbQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v9",
  zoom: 2.5,
});

map.on("load", async () => {
  // Get the initial location of the International Space Station (ISS).
  const geojson = await getLocation();
  // Add the ISS location as a source.
  map.addSource("iss", {
    type: "geojson",
    data: geojson,
  });
  // Add the rocket symbol layer to the map.
  map.addLayer({
    id: "iss",
    type: "symbol",
    source: "iss",
    layout: {
      "icon-image": "rocket-15",
    },
  });

  // Show ISS location details
  updateDetails(geojson);

  // Update the source from the API every 2 seconds.
  const updateSource = setInterval(async () => {
    const geojson = await getLocation(updateSource);
    map.getSource("iss").setData(geojson);
    updateDetails(geojson);
  }, 5000);

  async function getLocation(updateSource) {
    // Make a GET request to the API and return the location of the ISS.
    try {
      const response = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544",
        { method: "GET" }
      );
      //      const { latitude, longitude } = await response.json();
      const curLoc = await response.json();
      const latitude = curLoc.latitude;
      const longitude = curLoc.longitude;

      // Fly the map to the location.
      map.flyTo({
        center: [longitude, latitude],
        speed: 0.5,
      });

      // Use the GeoJSON JS libraty to parse the response into GeoJSON format
      var geoJsonLoc = GeoJSON.parse(curLoc, {
        Point: ["latitude", "longitude"],
      });
      return geoJsonLoc;
    } catch (err) {
      // If the updateSource interval is defined, clear the interval to stop updating the source.
      if (updateSource) clearInterval(updateSource);
      throw new Error(err);
    }
  }

  function updateDetails(geojson) {
    console.log(geojson.properties);
    var details = geojson.properties;
    var resultingDOM = "<p class='fs-3'>Real time telemetry data</p>";
    for (var prop in geojson.properties) {
      resultingDOM +=
        "<span class='fw-bold'>" +
        prop.toUpperCase() +
        "</span>" +
        ": " +
        details[prop] +
        "</br>";
    }

    document.getElementById("details").innerHTML = resultingDOM;
  }
});
