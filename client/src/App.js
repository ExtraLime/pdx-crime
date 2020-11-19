
import React, { useEffect, useState } from "react";
import useDropdown from './components/useDropdown';
import BarChart from './components/BarChart';
import CrimeMap from './components/CrimeMap';
import LineChart from './components/LineChart'
import HoodCrimeMap from './components/HoodCrimeMap'
import Header from './components/Header';
import ChoroplethMap from './components/Choropleth';
import useDateRange from './components/useDateRange'
import useHoodCrime from './components/useHoodCrime'
import "./App.scss";
import { crimeIcon, eventRenderer, dateRangeChartData, choroplethChartData, neighborhoodsChartData } from './utils/Helper.js';
import { categories, neighborhoods, entities } from './data/index';

import { fetchHoodCrimeData,
         fetchNewHoodCrimeData,
         fetchDateRangeData,
         fetchNewDateRangeData,
         fetchMapData,
         fetchCrimeChartData,
         fetchNeighborhoodsData,
         fetchChoroplethMapData } from './utils/AsyncHelpers.js'

export default function App() {
  const [crimeChartData, setCrimeChartData] = useState([]);
  const [neighborhoodChartData, setNChartData] = useState([]);
  const [event, EventDropdown] = useDropdown("Entity", "All", entities);
  const [crime, CrimeDropdown] = useDropdown("Crime", "All", categories);
  const [hood, NeighborhoodDropdown] = useDropdown("Neighborhood", "All", neighborhoods);
  const [mapData, setMapData] = useState([]);
  const [choroplethMapData, setCMapData] = useState(null);
  const [startDate, endDate, DateRangeSelection] = useDateRange()
  const [dateRangeData, setDateRangeData] = useState([]);
  const [timeHood, timeCrime, HoodCrimeSelection] = useHoodCrime()
  const [hoodCrimeData, setHoodCrimeData] = useState([]);
  
  
  
  useEffect(() => {
    fetchMapData(setMapData);
    fetchCrimeChartData(setCrimeChartData, crime);
  },[crime]);
  
  useEffect(() => {
    fetchNeighborhoodsData(setNChartData, hood);
  }, [hood]);
  
  useEffect(() => {
    fetchChoroplethMapData(setCMapData, crime);
  }, [crime]);
  
  useEffect(() => {
    fetchDateRangeData(setDateRangeData);
  }, []);

  useEffect(() => {
    fetchNewDateRangeData(setDateRangeData, {startDate,endDate});
  }, [startDate, endDate])

  useEffect(() => {
    fetchHoodCrimeData(setHoodCrimeData);
  }, [])

  useEffect(() => {
    fetchNewHoodCrimeData(setHoodCrimeData, {timeHood,timeCrime,startDate,endDate});
  }, [timeHood, timeCrime,startDate,endDate])


  return (
    <div className="container">
      <Header />
      <EventDropdown />
      <CrimeMap crimeData={mapData} 
                eventRenderer={eventRenderer} 
                event={event} 
                crimeIcon={crimeIcon} 
        />
      <CrimeDropdown />
      <BarChart data={choroplethChartData(crimeChartData, crime)}
                text={choroplethChartData(crimeChartData, crime).datasets[0].label}
                type="horizontalBar"
        />
      {choroplethMapData && <ChoroplethMap geojson={choroplethMapData}/>}
      <NeighborhoodDropdown />
      <BarChart data={neighborhoodsChartData(neighborhoodChartData, hood)}
                text={neighborhoodsChartData(neighborhoodChartData, hood).datasets[0].label}
                type="bar"
        />
      <DateRangeSelection />
      <HoodCrimeSelection />
      <LineChart data={dateRangeChartData(dateRangeData)}
                 text={`From ${startDate.toDateString()} to ${endDate.toDateString()}`}
                 type="line"
        />
      <HoodCrimeMap crimeData={hoodCrimeData}
                    eventRenderer={eventRenderer}
                    event={event}
                    crimeIcon={crimeIcon}
        />
    </div>
    
  );  
}



