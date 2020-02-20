import React from 'react'
import { TextSelect } from './TextSelect'
import Page from './Page'

function Method(props) {
  return (
    <TextSelect
      options={['v60']}
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

  for(let i=8;i<40;i++) {
    coffeeAmount.push(i)
  }

  return coffeeAmount
}

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.handleMethodChange = this.handleMethodChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }

  handleMethodChange(e) {
    this.props.onHandleMethodChange(e.target.value);
  }

  handleAmountChange(e) {
    this.props.onHandleAmountChange(e.target.value);
  }

  render() {
    return (
      <Page>
        <h1>Brew Guide</h1>
        <p>I want to make a{' '}
        <Method
          default={this.props.method}
          onChange={this.handleMethodChange}
        />{' '}
        with{' '}
        <Amount
          default={this.props.totalCoffee}
          onChange={this.handleAmountChange}
        />
        g of coffee.</p>
        <button onClick={this.props.onNextButton}>Lets go!</button>
      </Page>
    )
  }
}
