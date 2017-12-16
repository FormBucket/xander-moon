import React, { PropTypes } from 'react'
import {branch} from 'functionfoundry'

class FlashMessage extends React.Component {
  render() {
    return branch(this.props.text && typeof this.props.text === 'string',
      // you won't miss the giant red box. Now here is your chance to change the color of the beast.
      //
      <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: 60, background: '#666', color: 'white', textAlign: 'center', paddingTop: 5, fontSize: '2em'
        }}>
        {this.props.text}
      </div>,
      <div></div>
    )
  }
}

export default FlashMessage
