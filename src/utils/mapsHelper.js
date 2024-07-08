import { Loader } from "@googlemaps/js-api-loader";

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
const map_id = import.meta.env.VITE_MAP_ID;

const loader = new Loader({
  apiKey: api_key,
  version: 'weekly'
});

export const loadMap = async (elementId) => {
  return loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(document.getElementById(elementId), {
      center: { lat: 4.624335, lng: -74.063644 },
      zoom: 12,
      mapId: map_id,
    });

    return map;
  })
};

export const loadMarkers = async (markersList = [], map) => {
  const markers = {};

  markersList.forEach((mark, index) => {
    if (mark.lat && mark.lon) {
      const marker = new google.maps.Marker({
        map,
        position: {
          lat: mark.lat,
          lng: mark.lon
        }
      });

      const key = mark?.key ?? index;

      markers[key] = marker
    }
  });

  return markers;
};

export const drawPolygon = (paths, map, options = {}) => {
  const polygon = new google.maps.Polygon({
    paths,
    strokeColor: '#3b82f6',
    strokeOpacity: 1,
    strokeWidth: 3,
    fillOpacity: 0,
  });

  polygon.setMap(map);

  return polygon;
}
