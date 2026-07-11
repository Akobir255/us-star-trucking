import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyD4c8Gs15mvWYKOWFXB8viJggDLRn-OtQY",
  version: "weekly",
});

export async function getDistance(origin, destination) {
  await loader.load();

  return new Promise((resolve, reject) => {
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (status !== "OK") {
          reject(status);
          return;
        }

        const result = response.rows[0].elements[0];

        if (result.status !== "OK") {
          reject(result.status);
          return;
        }

        resolve({
          miles: Math.round(result.distance.value / 1609.34),
          distance: result.distance.text,
          duration: result.duration.text,
        });
      }
    );
  });
}