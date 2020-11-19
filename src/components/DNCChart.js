import { connect } from 'react-redux'
import { getDates } from '../util'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { ma } from 'moving-averages'

const generateData = (data) => ({
  labels: getDates(data),
  datasets: [
    {
      label: '7 Day Moving Average',
      type: 'line',
      data: ma(data, 7),
      fill: false,
      borderColor: '#41b5fd',
    },
    {
      type: 'bar',
      label: 'Daily New Cases',
      data: data,
      fill: false,
      backgroundColor: '#fd4159',
    },
  ],
})

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        gridLines: {
          display: false,
        },
      },
    ],
  },
}

const DNCChart = (props) => {
  const { data, selectedState } = props

  if (data && data[selectedState]) {
    const stateData = generateData(data[selectedState])

    return (
      <div id="chart-container">
        <h3>Daily New Cases</h3>
        <Bar data={stateData} options={options} />
      </div>
    )
  }

  return <div></div>
}

const mapState = (state) => {
  return {
    data: state.DNCData,
    selectedState: state.selectedState,
  }
}

export default connect(mapState, null)(DNCChart)
