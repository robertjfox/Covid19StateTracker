import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const GOT_DNC_DATA = 'GOT_DNC_DATA'
const GOT_HOSPITAL_DATA = 'GOT_HOSPITAL_DATA'
const GOT_TOTAL_COUNTS = 'GOT_TOTAL_COUNTS'
const CHANGE_SELECTED_STATE = 'CHANGE_SELECTED_STATE'

const initialState = {
  DNCData: { TEST: [] },
  HospitalData: { TEST: [] },
  TotalCounts: { TEST: [0, 0, 0, 0] },
  selectedState: 'TEST',
}

const gotDNCData = (data) => ({ type: GOT_DNC_DATA, data })
const gotHospitalData = (data) => ({ type: GOT_HOSPITAL_DATA, data })
const gotTotalCounts = (data) => ({ type: GOT_TOTAL_COUNTS, data })
export const changeSelectedState = (selectedState) => ({
  type: CHANGE_SELECTED_STATE,
  selectedState,
})

export const getStateData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      'https://covidtracking.com/api/v1/states/daily.json'
    )
    let DNCData = { TEST: [] }
    let HospitalData = { TEST: [] }
    let TotalCounts = { TEST: [0, 0, 0, 0] }
    for (let i = data.length - 1; i >= 0; i--) {
      if (DNCData[data[i].state] && data[i].positiveIncrease) {
        DNCData[data[i].state].push(Math.max(data[i].positiveIncrease, 0))
      } else if (data[i].positiveIncrease) {
        DNCData[data[i].state] = [Math.max(data[i].positiveIncrease, 0)]
      }
      if (HospitalData[data[i].state] && data[i].deathIncrease !== null) {
        HospitalData[data[i].state].push(Math.max(data[i].deathIncrease, 0))
      } else if (data[i].deathIncrease !== null) {
        HospitalData[data[i].state] = [Math.max(data[i].deathIncrease, 0)]
      }
    }
    let i = 0
    while (TotalCounts[data[i].state] === undefined) {
      TotalCounts[data[i].state] = [
        data[i].positive,
        data[i].death,
        data[i].hospitalizedCumulative,
        data[i].hospitalizedCurrently,
      ]
      i++
    }

    dispatch(gotDNCData(DNCData))
    dispatch(gotHospitalData(HospitalData))
    dispatch(gotTotalCounts(TotalCounts))
  } catch (error) {
    console.error(error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_DNC_DATA:
      return { ...state, DNCData: action.data }
    case GOT_HOSPITAL_DATA:
      return { ...state, HospitalData: action.data }
    case GOT_TOTAL_COUNTS:
      return { ...state, TotalCounts: action.data }
    case CHANGE_SELECTED_STATE:
      return {
        ...state,
        selectedState: action.selectedState,
      }
    default:
      return state
  }
}

const store = createStore(reducer, middleware)

export default store
