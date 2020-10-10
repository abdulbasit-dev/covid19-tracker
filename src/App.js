import React, {useState, useEffect} from 'react'
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core'
import './App.css'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import {sortDate} from './utill'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

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
      .then(result => {
        setCountry(counrtyCode)
        setCountryInfo(result)
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
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            title='Coronavirus Cases'
          />
          <InfoBox
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            title='Recovered'
          />
          <InfoBox cases={countryInfo?.todayDeaths} total={countryInfo.deaths} title='Deaths' />
        </div>

        {countryInfo && <img src={countryInfo?.countryInfo?.flag} alt='' />}

        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* graph  */}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
