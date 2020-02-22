import React from 'react'
import { TextSelect } from './TextSelect'
import Page from './Page'

function Method(props) {
  return (
    <TextSelect
      options={props.methods}
      active={props.default}
      onChange={props.onChange}
    />
  )
}

function Amount(props) {
  return (
    <TextSelect
      options={waterAmounts()}
      active={props.default}
      onChange={props.onChange}
    />
  )
}

function waterAmounts() {
  let coffeeAmount = []

  for (let i = 8; i < 40; i++) {
    coffeeAmount.push(i)
  }

  return coffeeAmount
}

function Intro(props) {
  function handleMethodChange(e) {
    props.handleMethodChange(e.target.value)
  }

  function handleAmountChange(e) {
    props.handleAmountChange(e.target.value)
  }

  return (
    <Page>
      <h1>Brew Guide</h1>
      <p>
        I want to make a{' '}
        <Method
          methods={props.methods}
          default={props.method}
          onChange={handleMethodChange}
        />{' '}
        with{' '}
        <Amount default={props.totalCoffee} onChange={handleAmountChange} />{' '}
        {props.measurement} of coffee.
      </p>
      <button onClick={props.onNextButton}>Lets go!</button>
    </Page>
  )
}

export default Intro
