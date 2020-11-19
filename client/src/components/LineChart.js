import React from 'react';
import { HorizontalBar, Bar, Line } from 'react-chartjs-2';

const components = {
  horizontalBar: HorizontalBar,
  bar: Bar,
  line: Line
};

const LineChart = (props) => {
  const { data, text, type } = props;
  const SpecificChart = components[type];

  return (
    <>
      <div className={`t${type.toLowerCase()}`}>
        <SpecificChart
          data={data}
          width={325}
          height={250}
          options={{
            title:{
              display:true,
              text:text,
              fontSize:20,
              fontColor: "white"
            },
            maintainAspectRatio: false,
            legend:{
              display:false,
              position:'right',
              labels: {
                fontColor: 'white',
                stepSize: 1
              }
            },
            scales: {
              yAxes: [{
                  ticks: {
                      fontColor: "white",
                  }
              }],
              xAxes: [{
                  ticks: {
                      fontColor: "white",
                  }
              }]
            },
            layout: {
              padding: {
                left: 60,
              },
            }
          }}
        />
      </div>
    </>
  );
};

export default LineChart;