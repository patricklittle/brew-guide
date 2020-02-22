import React, { useState } from 'react'
import Intro from './components/Intro'
import BrewStep from './components/BrewStep'
import Page from './components/Page'
import * as data from './db.json'

const methods = data.methods.map(method => method.name)
const initialMethod = data.methods[0]

function getTotalWater(coffee, ratio) {
  let multiplier = ratio.split(':')[1]

  return Math.round(coffee * multiplier)
}

function BrewGuide() {
  const [
    { measurement, ratio, groundSetting, instructions },
    setMethod
  ] = useState(initialMethod)
  const [{ totalWater }, setTotalWater] = useState({
    totalWater: initialMethod.totalWater
  })
  const [{ totalSteps }, setTotalSteps] = useState({
    totalSteps: initialMethod.instructions.length
  })
  const [{ totalCoffee }, setTotalCoffee] = useState({
    totalCoffee: initialMethod.totalCoffee
  })
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)

  function handleMethodChange(methodName) {
    let method = data.methods.find(method => method.name === methodName)

    setMethod(method)
    setTotalSteps({ totalSteps: method.instructions.length })
    setTotalCoffee({ totalCoffee: method.totalCoffee })
    setTotalWater({ totalWater: getTotalWater(totalCoffee, ratio) })
  }

  function handleAmountChange(coffee) {
    setTotalCoffee({ totalCoffee: coffee })
    setTotalWater({ totalWater: getTotalWater(coffee, ratio) })
  }

  function handleNext() {
    if (!active) {
      setActive(true)
    } else {
      setStep(step + 1)
    }
  }

  function handleBack() {
    if (!step) {
      setActive(false)
    } else {
      setStep(step - 1)
    }
  }

  function handleRestart() {}

  if (!active) {
    return (
      <Intro
        methods={methods}
        measurement={measurement}
        totalCoffee={totalCoffee}
        handleMethodChange={handleMethodChange}
        handleAmountChange={handleAmountChange}
        onNextButton={handleNext}
      />
    )
  } else if (active && step < totalSteps) {
    return (
      <BrewStep
        step={step}
        totalCoffee={totalCoffee}
        groundSetting={groundSetting}
        instructions={instructions}
        totalWater={totalWater}
        measurement={measurement}
        onNextButton={handleNext}
        onBackButton={handleBack}
      />
    )
  } else {
    return (
      <Page>
        <h2>Enjoy!</h2>
        <p>Hope your coffee is great!</p>
        <p>
          <a href="https://www.buymeacoffee.com/3vJ68F0">Buy me a coffee</a>
        </p>
        <button onClick={handleRestart}>Reset</button>
      </Page>
    )
  }
}

export default BrewGuide
