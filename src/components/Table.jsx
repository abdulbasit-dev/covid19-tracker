import React from 'react'
import './Table.css'

function Table({countries}) {
  return (
    <div className='table'>
      {countries.map(({country, cases}) => (
        <tr key={country}>
          <td>{country}</td>
          <td>{cases}</td>
        </tr>
      ))}
    </div>
  )
}

export default Table
