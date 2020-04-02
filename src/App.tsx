import React from 'react';
import './App.css';
import WeatherHeader from './components/header';
import Forecasts from './components/forecast';

function App() {
  return (
    <>
      <WeatherHeader />
      <Forecasts />
    </>
  );
}

export default App;
