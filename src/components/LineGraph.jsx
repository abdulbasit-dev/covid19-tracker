import React, {useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'

//used for Linegraph
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0')
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return numeral(value).format('0a')
          },
        },
      },
    ],
  },
}

function LineGraph({caseType = 'cases'}) {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then(resp => resp.json())
      .then(data => {
        const chartDate = buildChartData(data, caseType)
        setData(chartDate)
      })
  }, [caseType])

  const buildChartData = (data, caseType) => {
    const chartDate = []
    let lastDataPoint
    //this date is like 6/16/20
    for (let date in data[caseType]) {
      if (lastDataPoint) {
        let newDataPoin = {
          x: date,
          y: data[caseType][date] - lastDataPoint,
        }
        chartDate.push(newDataPoin)
      }
      lastDataPoint = data[caseType][date]
    }
    return chartDate
  }

  return (
    <div className='lineGraph'>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  )
}

export default LineGraph
