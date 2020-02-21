import React from 'react'
import Countdown from 'react-countdown'
import Page from './Page'

let style = {
  Countdown: {
    fontSize: '3em',
    fontWeight: '100',
  },
  P: {
    maxWidth: '400px'
  }
}

const renderer = ({minutes, seconds, completed }) => {
  let s = seconds.length > 9 ? seconds : ("0" + seconds).slice(-2)

  return <span style={style.Countdown}>{minutes}:{s}</span>
};

function replaceVariables(props, str) {
  console.log(props)
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
        renderer={renderer}
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
    let instructions = this.props.instructions[this.props.step]
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
        <p style={style.P}>{text}</p>
        <NextButton showButton={showButton} onClick={this.props.onNextButton} text={instructions.nextButtonText} />
      </Page>
    )
  }
}
