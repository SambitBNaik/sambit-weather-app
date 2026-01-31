import { useEffect, useState } from 'react';
import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Layout/> }>
            <Route  index element={<DashboardPage/>}/>
            <Route path="city/:cityId" element={<DetailsPage/>} />
            <Route path='*' element={<Navigate to="/" replace />}/>
         </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
