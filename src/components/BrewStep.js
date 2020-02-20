import React from 'react'
import Countdown from 'react-countdown'
import Page from './Page'

function replaceVariables(props, str) {
  const regex = /{(.*?)}/gi

  function swap(x) {
    let key = x.slice(1, -1)

    return props[key] ? props[key] : key
  }

  let p = String(str)

  return p.replace(regex, swap)
}

function Timer(props) {
  if (props.time) {
    let count = props.time * 1000
    return (
      <Countdown
        key={props.stepKey}
        date={Date.now() + count}
        onComplete={props.onComplete}
      />
    )
  } else {
    return null
  }
}

function NextButton(props) {
  if (props.showButton) {
    return <button onClick={props.onClick}>{props.text}</button>
  } else {
    return null
  }
}

export default class BrewStep extends React.Component {
  constructor(props) {
    super(props)
    this.onTimerComplete = this.onTimerComplete.bind(this)
  }

  onTimerComplete() {
    this.props.onNextButton()
  }

  render() {
    let instructions = this.props.instructions
    let text = replaceVariables(this.props, instructions.text)
    let time = instructions.showTimer ? instructions.time : 0
    let showButton = !instructions.showTimer

    return (
      <Page>
        <h2>{instructions.title}</h2>
        <Timer
          time={time}
          onComplete={this.onTimerComplete}
          stepKey={this.props.step}
        />
        <p>{text}</p>
        <NextButton showButton={showButton} onClick={this.props.onNextButton} text={instructions.nextButtonText} />
      </Page>
    )
  }
}
