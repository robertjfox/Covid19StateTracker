Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export function debounce(fn, ms) {
  let timer
  return (_) => {
    clearTimeout(timer)
    timer = setTimeout((_) => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

export function getDates(data) {
  if (data) {
    let stopDate = new Date()
    let startDate = new Date()
    startDate.setDate(startDate.getDate() - data.length)
  
    var dateArray = []
    var currentDate = startDate
    while (currentDate <= stopDate) {
      let date = new Date(currentDate).toISOString().slice(0, 10)
      dateArray.push(date)
      currentDate = currentDate.addDays(1)
    }
    return dateArray
  }
}

export const stateNames = {
  TEST: 'Select a State',
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
}

export const statePops = {
  TEST: 1,
  AL: 4903185,
  AK: 731545,
  AS: 55641,
  AZ: 7278717,
  AR: 3017825,
  CA: 39512223,
  CO: 5758736,
  CT: 3565287,
  DE: 973764,
  DC: 705749,
  FL: 21477737,
  GA: 10617423,
  GU: 165718,
  HI: 1415872,
  ID: 1787065,
  IL: 12671821,
  IN: 6732219,
  IA: 3155070,
  KS: 2913314,
  KY: 4467673,
  LA: 4648794,
  ME: 1344212,
  MD: 6045680,
  MA: 6949503,
  MI: 9986857,
  MN: 5639632,
  MS: 2976149,
  MO: 6137428,
  MT: 1068778,
  NE: 1934408,
  NV: 3080156,
  NH: 1359711,
  NJ: 8882190,
  NM: 2096829,
  NY: 19453561,
  NC: 10488084,
  ND: 762062,
  OH: 11689100,
  OK: 3956971,
  OR: 4217737,
  PA: 12801989,
  PR: 3193694,
  RI: 1059361,
  SC: 5148714,
  SD: 884659,
  TN: 6833174,
  TX: 28995881,
  UT: 3205958,
  VT: 623989,
  VA: 8535519,
  WA: 7614893,
  WV: 1792147,
  WI: 5822434,
  WY: 578759,
}
