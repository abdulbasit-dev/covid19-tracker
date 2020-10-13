import React, {useState, useEffect} from 'react'
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core'
import './App.css'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import {sortDate} from './util'
import LineGraph from './components/LineGraph'

function App() {
  //fill drob down wit the all country
  const [countries, setCountries] = useState([])
  //select single country
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState('cases')
  const [mapzomm, setMapzomm] = useState(3)
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapCountries, setMapCountries] = useState([])

  //get alll country data
  useEffect(() => {
    const getCountriesDate = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(resp => resp.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }))
          setCountries(countries)
          setTableData(sortDate(data))
          setMapCountries(data)
        })
    }
    getCountriesDate()
  }, [])

  //get all the worl information
  useEffect(() => {
    const getCountriesDate = async () => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then(resp => resp.json())
        .then(data => setCountryInfo(data))
    }
    getCountriesDate()
  }, [])

  //select counrty from dropdown
  const onCountryChange = async e => {
    const counrtyCode = e.target.value
    //decide to use which link
    const url =
      counrtyCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${counrtyCode}`

    await fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setCountry(counrtyCode)
        setCountryInfo(data)
        if (counrtyCode === 'worldwide') {
          setMapCenter({lat: 34.80746, lng: -40.4796})
          setMapzomm(3)
        } else {
          setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long})
          setMapzomm(3)
        }
      })
  }

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value='worldwide'>WorldWide</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox
            isRed
            active={casesType === 'cases'}
            handleClick={e => setCasesType('cases')}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            title='Coronavirus Cases'
          />
          <InfoBox
            active={casesType === 'recovered'}
            handleClick={e => setCasesType('recovered')}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            title='Recovered'
          />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            handleClick={e => setCasesType('deaths')}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            title='Deaths'
          />
        </div>
        <Map center={mapCenter} zoom={mapzomm} countries={mapCountries} casesType={casesType} />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3 className='app__graphTitle'>
            Worldwide new <span className='app__casesType'>{casesType}</span>
          </h3>
          {/* graph  */}
          <LineGraph caseType={casesType} />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
