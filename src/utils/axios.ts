import axios from "axios";

export const GeoAPI = axios.create({
    baseURL: "https://geo.ipify.org/api/v2/"
})

GeoAPI.interceptors.request.use((config) => {
    if(config.url.includes("?")) {
        config.url += `&apiKey=${import.meta.env.VITE_API_KEY}`
    } else {
        config.url += `?apiKey=${import.meta.env.VITE_API_KEY}`
    }
    return config
})

export const OpenStreetMapAPI = axios.create({
    baseURL: "https://nominatim.openstreetmap.org/"
})