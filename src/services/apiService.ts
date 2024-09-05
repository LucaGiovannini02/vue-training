import { GeoAPI, OpenStreetMapAPI } from '../utils/axios';
import { GeoResponse } from '../Models/GeoResponse';
import { OpenStreetMapResponse } from '../Models/OpenStreetMapResponse';

export const fetchGeoData = async (endpoint: string): Promise<GeoResponse> => {
    const response = await GeoAPI.get<GeoResponse>(endpoint)
    return response.data
};

export const fetchLocationData = async (location: string): Promise<OpenStreetMapResponse> => {
    const response = await OpenStreetMapAPI.get<OpenStreetMapResponse>(`search?format=json&q=${location}`)
    return response.data
};