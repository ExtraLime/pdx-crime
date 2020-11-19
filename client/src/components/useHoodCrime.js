import React from "react";
import useDropdown from './useDropdown.js'
import { categories, neighborhoods } from '../data/index';


const useHoodCrime = () => {
  const [timeHood, TimeHoodDropdown] = useDropdown("Neighborhood", "All", neighborhoods);
  const [timeCrime, TimeCrimeDropdown] = useDropdown("Crime", "All", categories);

  const HoodCrime = () => (    
    <div className={'hood-crime'}>
        <div className={'th-dropdown'}> 
      <TimeHoodDropdown /> 
        </div>
        <div className={'tc-dropdown'}>
      <TimeCrimeDropdown />
      </div>
    </div>
  );

  return [ timeHood, timeCrime, HoodCrime]
}
export default useHoodCrime;