import { police, fireman, medical } from '../data/Icons';

export const crimeIcon = (crime) => crime.text.includes("MED") 
                                      ? medical 
                                      : crime.text.includes("FIRE") || crime.text.includes("Portland Fire")
                                      ? fireman
                                      : police 

export const eventRenderer = (event, crime) => event === "All" ? crime : crime.entity.includes(event);

const primaryChartColor = 'rgb(29, 145, 192)';

export const choroplethChartData = (data, crime) => {
  return {labels: data.map(item => item.location),
          datasets: [
            {
              label: crime,
              color: '#fff',
              backgroundColor: primaryChartColor,
              borderColor: primaryChartColor,
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}

export const neighborhoodsChartData = (data, hood) => {
  return {labels: data.map(item => item.category),
          datasets: [
            {
              label: hood,
              backgroundColor: primaryChartColor,
              borderColor: primaryChartColor,
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}
export const dateRangeChartData = (data) => {
  console.log(data)
  return {labels: data.map(day => new Date(day.date).toISOString().slice(0,10)),
          datasets: [
            {
              label: 'Daily Count',
              backgroundColor: primaryChartColor,
              borderColor: primaryChartColor,
              borderWidth: 2,
              fill: false,
              lineTension:0.5,
              data: data.map(day => day.count)
            }
          ]}
}
