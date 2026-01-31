import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ''; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async(lat,lon)=>{
    try {
        const res = await axios.get(`${BASE_URL}/weather`,{
            params:{ lat, lon, units:'metric', appid:API_KEY }
        })
        return res.data;
    } catch (error) {
        console.error("Error in the fetchweather",error);
    }
}

export const searchCitis = async(query)=>{
    try {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
        return res.data;
    } catch (error) {
        console.error("Error in the searchCitis service",error);
    }
}

export const fetchForecast = async(lat, lon)=>{
    try {
        const res = await axios.get(`${BASE_URL}/forecast`,{
            params:{ lat, lon, units:'metric', appid: API_KEY},
        });
        return res.data;
    } catch (error) {
        console.error("Error in the forecast service", error);
    }
}