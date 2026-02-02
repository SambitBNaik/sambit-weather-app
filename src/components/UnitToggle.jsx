import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from '../redux/settingsSlice';
import "../styles/components/UnitToggle.css";

const UnitToggle = () => {
    const dispatch = useDispatch();
    const unit = useSelector((state)=> state.settings.unit);
  return (
    <button
       onClick={()=>dispatch(toggleUnit())}
       className='unit-toggle-btn'
    >
        <div className={`toggle-option ${unit === 'metric' ? 'active' : ''}`}>
                °C
        </div>
        <div className={`toggle-option ${unit === 'imperial' ? 'active' : ''}`}>
                °F
        </div>
    </button>
  )
}

export default UnitToggle