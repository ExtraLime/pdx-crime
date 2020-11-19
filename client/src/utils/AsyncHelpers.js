import axios from 'axios';



export async function fetchMapData(setMapData) {
  const result = await axios(
    `/map-tweets`,
  );
  setMapData(result.data);
}

export async function fetchCrimeChartData(setData, crime) {
  if (crime === "All") {
    crime = "initcrime"
  }
  const result = await axios(
    `/${crime}`,
  );
  setData(result.data);
}

export async function fetchNeighborhoodsData(setNData, hood) {
  if (hood === "All") {
    hood = "inithood"
  }
  const result = await axios(
    `/neighborhood/${hood}`,
  );
  setNData(result.data);
}

export async function fetchChoroplethMapData(setCMapData, crime) {
  if (crime === "All") {
    crime = "chorodata"
  }
  const result = await axios(
    `/choro/${crime}`,
  );
  setCMapData(result.data);
}

export async function fetchDateRangeData(setDateRangeData) {
  const tdate = new Date()
  const startDate = new Date(tdate.setDate(tdate.getDate()-60));
  const endDate = new Date(tdate.setDate(tdate.getDate()+59));

  const sD = await startDate.toISOString().slice(0,10);
  const eD = await endDate.toISOString().slice(0,10);
    
  const result = await axios(
    `/range/${sD}/${eD}`,
  );
  setDateRangeData(result.data);
}

export async function fetchNewDateRangeData(setDateRangeData,dateRange) {
  const { startDate, endDate } = dateRange
  let sD, eD;
  if (startDate !== undefined){
    sD = await startDate.toISOString().slice(0,10);
    eD = await endDate.toISOString().slice(0,10);
  }
    
  const result = await axios(
    `/range/${sD}/${eD}`,
  );
  setDateRangeData(result.data);
}

export async function fetchHoodCrimeData(setHoodCrimeData) {
  const result = await axios(
    `/hoodCrime`,
  );
  setHoodCrimeData(result.data);
}

export async function fetchNewHoodCrimeData(setHoodCrimeData,specs) {
  const { timeHood, timeCrime, startDate, endDate } = specs
  let sD, eD;
  if (startDate !== undefined){
    sD = await startDate.toISOString().slice(0,10);
    eD = await endDate.toISOString().slice(0,10);
  }
    
  const result = await axios(
    `/detailed/${sD}/${eD}/${timeHood}/${timeCrime}`,
  );
  setHoodCrimeData(result.data);
}