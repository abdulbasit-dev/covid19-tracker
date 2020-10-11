import React from 'react'
import numeral from 'numeral'
import {Circle, Popup} from 'react-leaflet'

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
}

export const sortDate = data => {
  const sortedData = [...data]
  //1 stand for true and -1 stand for false
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const prettyPrintStat = stat => (stat ? `+${numeral(stat).format('0,0a')}` : '+0')

//drow cirlce on the map, with atractive tooltip
export const showDataOnMap = (data, casesType = 'cases') =>
  data.map(country => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        <div className='info-container'>
          <div
            className='info-flag'
            style={{backgroundImage: `url(${country.countryInfo.flag})`}}
          ></div>
          <div className='info-name'>{country.country}</div>
          <div className='info-cases'>Cases {numeral(country.cases).format('0,0')}</div>
          <div className='info-recovered'>Recovered {country.recovered}</div>
          <div className='info-deaths'>Deaths {country.deaths}</div>
        </div>
      </Popup>
    </Circle>
  ))
