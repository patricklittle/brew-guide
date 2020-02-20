import React from 'react'
import './TextSelect.css'

export default class TextSelect extends React.Component {
  constructor(props) {
    super(props)
    this.selectInput = React.createRef();
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      selectedOption: this.props.active
    }
  }

  handleChange(e) {
    this.setState({
      selectedOption: e.target.value
    })

    this.props.onChange(
      e,
      e.target.value,
      this.props.options[e.target.value]
    )
  }

  render() {
    let { options, className } = this.props
    let classList = 'TextSelect'

    if (className) classList += ' ' + className

    return (
      <span className={classList}>
        <select
          ref={this.selectInput}
          className="TextSelect-input"
          onChange={this.handleChange}
          value={this.state.selectedOption}
        >
          {options.map((value, key) => (
            <option value={value} key={key}>
              {value}
            </option>
          ))}
        </select>
      </span>
    )
  }
}
