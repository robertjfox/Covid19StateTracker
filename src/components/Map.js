import React, { Component } from 'react'
import './Map.css'
import USAMap from 'react-usa-map'
import { connect } from 'react-redux'
import { changeSelectedState } from '../store'

class Map extends Component {
  state = {
    selected: null,
    width: window.innerWidth,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.width !== state.width) {
      return {
        width: props.width,
      }
    }

    return null
  }

  mapHandler = (event) => {
    const stateInitials = event.target.dataset.name
    this.props.changeSelectedState(stateInitials)
    this.setState({
      selected: stateInitials,
    })
  }

  statesCustomConfig = () => {
    return {
      [this.state.selected]: {
        fill: '#fd4159',
      },
    }
  }

  render() {
    return (
      <div className="Map">
        <button>Total</button>
        <USAMap
          customize={this.statesCustomConfig()}
          onClick={this.mapHandler}
          width={this.state.width * 0.33}
          height={this.state.width * 0.22}
        />
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeSelectedState: (newState) => dispatch(changeSelectedState(newState)),
  }
}

export default connect(null, mapDispatch)(Map)
