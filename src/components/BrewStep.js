import React from 'react'
import Countdown from 'react-countdown'
import Page from './Page'

let style = {
  Countdown: {
    fontSize: '3em',
    fontWeight: '100'
  },
  P: {
    maxWidth: '400px'
  }
}

const CountdownRenderer = ({ minutes, seconds, completed }) => {
  // force seconds to be 2 digits
  let secondsFormated = seconds.length > 9 ? seconds : ('0' + seconds).slice(-2)

  return (
    <span style={style.Countdown}>
      {minutes}:{secondsFormated}
    </span>
  )
}

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
        style={style.Countdown}
        key={props.stepKey}
        date={Date.now() + count}
        onComplete={props.onComplete}
        renderer={CountdownRenderer}
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

export default function BrewStep(props) {
  let instructions = props.instructions[props.step]
  let text = replaceVariables(props, instructions.text)
  let time = instructions.showTimer ? instructions.time : 0
  let showButton = !instructions.showTimer

  function onTimerComplete() {
    props.onNextButton()
  }

  return (
    <Page>
      <h2>{instructions.title}</h2>
      <Timer time={time} onComplete={onTimerComplete} stepKey={props.step} />
      <p style={style.P}>{text}</p>
      <button onClick={props.onBackButton}>Back</button>{' '}
      <NextButton
        showButton={showButton}
        onClick={props.onNextButton}
        text={instructions.nextButtonText}
      />
    </Page>
  )
}
