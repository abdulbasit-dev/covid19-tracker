import React from 'react'
import './InfoBox.css'
import {Card, CardContent, Typography} from '@material-ui/core'
import {prettyPrintStat} from '../util'

function InfoBox({title, cases, total, active, isRed, handleClick}) {
  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}
      onClick={handleClick}
    >
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          {prettyPrintStat(cases)}
        </h2>
        <Typography className='infoBox__total' color='textSecondary'>
          {prettyPrintStat(total)} total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
