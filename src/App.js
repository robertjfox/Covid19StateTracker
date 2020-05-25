import React, { useEffect, useState } from 'react'
import './App.css'
import Map from './components/Map'
import MobileSelector from './components/MobileSelector'
import DNCChart from './components/DNCChart'
import HospitalChart from './components/HospitalChart'
import Info from './components/Info'
import { connect } from 'react-redux'
import { getStateData } from './store'
import { debounce } from './util'

const App = (props) => {
  const [loaded, setLoaded] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    if (!loaded) {
      props.getStateData()
      setLoaded(true)
    }
    const debouncedHandleResize = debounce(
      () => setWidth(window.innerWidth),
      100
    )

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [props, width, loaded])

  console.log(width)

  return (
    <div className="App">
      <div id="top">
        <MobileSelector />
        <Map width={width} />
        <Info />
      </div>
      <div id="charts">
        <DNCChart />
        <HospitalChart />
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    getStateData: () => dispatch(getStateData()),
  }
}

export default connect(null, mapDispatch)(App)
