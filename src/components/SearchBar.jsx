import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetcher } from 'react-router-dom';
import { searchCitis } from '../services/weatherservice';
import { addFavorite } from '../redux/favoriteSlice';
import { getWeather } from '../redux/weatherSlice';
import { Loader, MapPin, Plus, Search } from 'lucide-react';
import '../styles/components/Search.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef(null);
    
    const dispatch = useDispatch();
    const favorites = useSelector(state=> state.favorites.items);

    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setShowDropDown(false);
            }
        };
        document.addEventListener('mousedown',handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    },[]);

    useEffect(()=>{
        const timer = setTimeout( async()=>{
            if(query.length > 2){
                setLoading(true);
                const cities = await searchCitis(query);
                setResults(cities);
                setLoading(false);
                setShowDropDown(true);
            } else {
                setResults([]);
                setShowDropDown(false);
            }
        },500); 

        return ()=>clearTimeout(timer);
    },[query]);

    const handleSelectCity =(city)=>{
        const cityId = city.id || `${city.lat.toFixed(2)}_${city.lon.toFixed(2)}`;
        const cityData = {...city, id: cityId};

        dispatch(addFavorite(cityData));
        dispatch(getWeather({cityId, lat: city.lat, lon: city.lon}));

        setQuery('');
        setShowDropDown(false);
    };

  return (
    <div className='search-wrapper' ref={dropDownRef}>
        <div className='glass-panel search-input-container'>
            <Search size={18} color='#94a3b8'/>
            <input
              type='text'
              placeholder='Search city...'
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              className='search-input'
              onFocus={()=>query.length > 2 && setShowDropDown(true)}
             />
             { loading && <Loader size={16} className='loader-spin' color='#94a3b8'/>}
        </div>
        { showDropDown && results.length > 0 &&(
            <div className='search-dropdown'>
                { results.map((city, index)=>(
                    <div
                      key={index}
                      onClick={()=>handleSelectCity(city)}
                      className='search-result-item'
                    >
                        <div className='result-info'>
                            <MapPin size={16} color='#38bdf8'/>
                            <span>{city.name}, {city.country}</span>
                        </div>
                        <Plus size={16} color='#94a3b8'/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default SearchBar