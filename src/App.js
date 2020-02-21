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

let methods = data.methods.map(method => method.name)

function getTotalWater(coffee, ratio) {
  let multiplier = ratio.split(':')[1]

  return coffee * multiplier
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handleMethodChange = this.handleMethodChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.state = {
      method: null,
      active: false
    }
  }

  handleNext(e) {
    if (!this.state.active) {
      this.setState({
        active: true
      })
    } else {
      this.setState({
        step: this.state.step + 1
      })
    }
  }

  handleMethodChange(method) {
    let {
      name,
      totalCoffee,
      instructions,
      measurement,
      ratio,
      groundSetting
    } = data.methods.filter(m => m.name === method)[0]
    let instructionsCount = instructions.length

    this.setState({
      method: name,
      totalCoffee: totalCoffee,
      active: false,
      step: 0,
      totalSteps: instructionsCount,
      measurement: measurement,
      instructions: instructions,
      ratio: ratio,
      groundSetting: groundSetting
    })
  }

  handleAmountChange(amount) {
    this.setState({
      totalCoffee: amount
    })
  }

  handleRestart() {
    let {
      name,
      totalCoffee,
      instructions,
      measurement,
      ratio,
      groundSetting
    } = data.methods[0]
    let instructionsCount = instructions.length

    this.setState({
      method: name,
      totalCoffee: totalCoffee,
      active: false,
      step: 0,
      totalSteps: instructionsCount,
      instructions: instructions,
      measurement: measurement,
      ratio: ratio,
      groundSetting: groundSetting
    })
  }

  componentDidMount() {
    this.handleRestart()
  }

  render() {
    if (!this.state.active) {
      return (
        <div className="App" style={style.App}>
          <Intro
            methods={methods}
            measurement={this.state.measurement}
            totalCoffee={this.state.totalCoffee}
            handleMethodChange={this.handleMethodChange}
            handleAmountChange={this.handleAmountChange}
            onNextButton={this.handleNext}
          />
        </div>
      )
    } else if (this.state.active && this.state.step < this.state.totalSteps) {
      let totalWater = getTotalWater(this.state.totalCoffee, this.state.ratio)

      return (
        <div className="App" style={style.App}>
          <BrewStep
            step={this.state.step}
            totalCoffee={this.state.totalCoffee}
            groundSetting={this.state.groundSetting}
            instructions={this.state.instructions}
            totalWater={totalWater}
            measurement={this.state.measurement}
            onNextButton={this.handleNext}
          />
        </div>
      )
    } else {
      return (
        <div className="App" style={style.App}>
          <Page>
            <h2>Enjoy!</h2>
            <p>Hope your coffee is great!</p>
            <p>
              <a href="https://www.buymeacoffee.com/3vJ68F0">Buy me a coffee</a>
            </p>
            <button onClick={this.props.handleRestart}>Reset</button>
          </Page>
        </div>
      )
    }
  }
}

export default App
