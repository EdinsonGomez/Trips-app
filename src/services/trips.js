import axios from "axios";
import mockData from "@/utils/mockData";

export const getTripsService = async () => {
  return mockData;
  // return axios.get('https://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0/api/trips/v1')
  //   .then(res => res.data)
};

export const getTripByIdService = async (tripId) => {
  const tripFound = mockData.trips.find((t) => t.id === tripId);

  if (!tripFound) return {};

  return tripFound;
};