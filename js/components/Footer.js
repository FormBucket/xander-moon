import React, { PropTypes } from 'react'
import {Link} from 'xander'
import version from '../version'

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div>
          <a href="https://twitter.com/formbucket" target="_blank">Twitter</a> | <a href="https://github.com/formbucket" target="_blank">Github</a> | <a href="https://facebook.com/formbucket" target="_blank">Facebook</a>
        </div>

        <div>
          <a href="https://status.formbucket.com/">Status</a> | <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/terms">Terms</a> | <a href="/privacy-policy">Privacy Policy</a>
        </div>

        <p>
      &copy; 2015-2018
      <Link to="https://www.formbucket.com">
        <img style={{ height: 30, paddingLeft: 5, paddingRight: 2, paddingTop: 15 }} src="/img/logo-purple.svg" alt="FormBucket" />
        FormBucket.com
      </Link>
        </p>


      </div>
    )
  }
}

export default Footer
