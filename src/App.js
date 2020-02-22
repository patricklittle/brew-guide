import React from 'react'
import BrewGuide from './BrewGuide'
import './App.css'
import { light } from './utils/colors.js'

let style = {
  App: {
    display: 'flex',
    height: '100%',
    width: '100%',
    background: light.body,
    color: light.text
  }
}

export default function App() {
  return (
    <div style={style.App}>
      <BrewGuide />
    </div>
  )
}
