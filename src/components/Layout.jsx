import React from 'react'
import '../styles/components/Layout.css';
import { CloudRain } from 'lucide-react';
import SearchBar from './SearchBar';
import UnitToggle from './UnitToggle';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className='layout-root'>
      <header className='glass-panel layout-header'>
        <div className='brand-container'>
          <div className='brand-icon'>
            <CloudRain color='white' size={24}/>
          </div>
          <h1 className='brand-title'>
            Atmosphere
          </h1>
        </div>

        <div className='search-section'>
          <SearchBar/>
        </div>

        <div className='actions-section'>
          <UnitToggle/>
        </div>
      </header>

      <main className='page-container page-main'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout