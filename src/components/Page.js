import React from 'react'

let style = {
  Page: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    padding: '2em'
  }
}

function Page(props) {
  return <div style={style.Page}>{props.children}</div>
}

export default Page