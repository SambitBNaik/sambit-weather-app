import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather } from '../features/weatherSlice';
import { CloudSun } from 'lucide-react';
import WeatherCard from '../components/WeatherCard';
import "../styles/pages/DashboardPage.css";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state=> state.favorites.items);

    useEffect(()=>{
        favorites.forEach(city=>{
            dispatch(getWeather({ cityId: city.id, lat: city.lat, lon:city.lon }));
        });
    },[favorites, dispatch]);

    if(favorites.length === 0){
        return(
            <div className='empty-state'>
                <CloudSun size={64} className='empty-icon'/>
                <h2 className='empty-title'>No Favorites Cities Yet</h2>
                <p>Search for city above and pin it to your dashboard.</p>
            </div>
        )
    }
  return (
    <div>
        <h2 className='dashboard-header'>My Cities</h2>
        <div className='dashboard-grid'>
                {favorites.map(city=>(
                   <WeatherCard key={city.id} cityId={city.id}/> 
                ))}
        </div>
    </div>
  )
}

export default DashboardPage