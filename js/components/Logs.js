import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {eq} from 'functionfoundry'
import UserStore from '../stores/user'
import moment from 'moment'
import {
  requestLogs
} from '../stores/webutils'

import {Link} from 'react-router'

class UserReport extends React.Component {
  state = {
    submissions: undefined,
    loaded: false,
    loading: false
  };

  componentDidMount() {

    if (UserStore.isUserLoggedIn()) {

      this.setState({ loading: true })

      requestLogs()
      .then(logs => this.setState({
        loading: false,
        loaded: true,
        logs: logs
      }))
      .catch(error => this.setState({ error: error }))

    }
  }

  render() {

    if (eq(this.state.loaded, false)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      )
    }



    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Logs</h1>
          </div>
        </div>
        <div className="wrapper">
          <table>
            <tr>
              <th>status</th>
              <th width="150">date</th>
            </tr>
            {
              this.state.logs.map((d) => (
                <tr>
                  <td>{d.status} <Link to={`/logs/${d.id}`}>{d.method} {d.url}</Link></td>
                  <td>{moment(d.ts).format("MMM DD, YYYY hh:mm a")}</td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>
    )
  }
}

export default UserReport
