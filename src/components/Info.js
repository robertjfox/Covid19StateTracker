import React from 'react'
import { connect } from 'react-redux'
import { stateNames, statePops } from '../util'

const Info = (props) => {
  const { totalCounts, selectedState } = props
  if (totalCounts && selectedState) {
    return (
      <div id="info">
        <h1>{stateNames[selectedState]}</h1>
        <h3>Total Cases: {totalCounts[selectedState][0]}</h3>
        <h3>
          Cases per 100K:{' '}
          {Math.floor(
            totalCounts[selectedState][0] / (statePops[selectedState] / 100000)
          )}
        </h3>
        <h3>Total Deaths: {totalCounts[selectedState][1]}</h3>
        <h3>
          Deaths per 100K:{' '}
          {(
            totalCounts[selectedState][1] /
            (statePops[selectedState] / 100000)
          ).toFixed(2)}
        </h3>
        <h3>Total Hospitalizations: {totalCounts[selectedState][2]}</h3>
        <h3>Current Hospitalizations: {totalCounts[selectedState][3]}</h3>
      </div>
    )
  }

  return <div id="info"></div>
}

const mapState = (state) => {
  return {
    totalCounts: state.TotalCounts,
    selectedState: state.selectedState,
  }
}

export default connect(mapState, null)(Info)
