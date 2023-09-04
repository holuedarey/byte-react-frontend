import React from 'react';
import {Bar} from 'react-chartjs-2';


const state = {
    labels: ['January', 'February', 'March',
             'April'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [65, 59, 80, 81]
      }
    ]
  }

export default function BarChart({indexAxis}) {

    const scales = {
        x:{
          grid:{
            display:false
          }
        }
      }
  return (
    <div>
        <Bar
          data={state}
          options={{
            indexAxis: indexAxis,
            title:{
              display:true,
              fontSize:20
            },
            plugins:{
                legend: {
                 display: false
                }
               },
              scales:scales,
          }}
        />
    </div>
  )
}
