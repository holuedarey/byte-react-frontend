import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const state = {
    labels: ['12am', '1am', '2am','3am', '4am', '5am', '6am', '7am',
             '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', 
             '4pm', '5pm', '6pm'
            ],
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#C74545',
        borderColor: '#C74545',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 57, 58, 65, 62]
      }
    ]
  }

export default function LineChart() {
  return (
    <div>
        <Line
          // height="90%"
          data={state}
          options={{
            title:{
              display:false,
              fontSize:20
            },
            plugins:{
              legend: {
               display: false
              }
             },
            scales:{
              y:{
                grid:{
                  display:false
                }
              }
            }
          }}
        />
    </div>
  )
}
