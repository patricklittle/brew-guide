import React from 'react'
import './App.css'
import Intro from './components/Intro'
import BrewStep from './components/BrewStep'
import Page from './components/Page'
import { light } from './utils/colors.js'
import * as data from './db.json'

let style = {
  App: {
    display: 'flex',
    height: '100%',
    width: '100%',
    background: light.body,
    color: light.text
  }
}

function getTotalWater(coffee, ratio) {
  let multiplier = ratio.split(':')[1]

  return coffee * multiplier
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.onHandleNext = this.onHandleNext.bind(this)
    this.onHandleMethodChange = this.onHandleMethodChange.bind(this)
    this.onHandleAmountChange = this.onHandleAmountChange.bind(this)
    this.state = {
      method: null,
      active: false,
      step: 0,
      totalSteps: null,
      totalCoffee: 18
    }
  }

  onHandleNext(e) {
    if (!this.state.active) {
      let method = data.methods['v60']
      let totalSteps = method.instructions.length

      this.setState({
        active: true,
        method: method,
        totalSteps: totalSteps
      })
    } else {
      this.setState({
        step: this.state.step + 1
      })
    }
  }

  onHandleMethodChange(method) {
    this.setState({
      method: method
    })
  }

  onHandleAmountChange(amount) {
    this.setState({
      totalCoffee: amount
    })
  }

  render() {
    if (!this.state.active) {
      return (
        <div className="App" style={style.App}>
          <Intro
            totalCoffee={this.state.totalCoffee}
            onHandleMethodChange={this.onHandleMethodChange}
            onHandleAmountChange={this.onHandleAmountChange}
            onNextButton={this.onHandleNext}
          />
        </div>
      )
    } else if (this.state.active && this.state.step < this.state.totalSteps) {
      let instructions = this.state.method.instructions[this.state.step]
      let coffee = this.state.totalCoffee
      let groundSetting = this.state.method.groundSetting
      let totalWater = getTotalWater(coffee, this.state.method.ratio)
      return (
        <div className="App" style={style.App}>
          <BrewStep
            step={this.state.step}
            totalCoffee={coffee}
            groundSetting={groundSetting}
            instructions={instructions}
            totalWater={totalWater}
            measurement="g"
            onNextButton={this.onHandleNext}
          />
        </div>
      )
    } else {
      return (
        <div className="App" style={style.App}>
          <Page>the end</Page>
        </div>
      )
    }
  }
}

export default App
