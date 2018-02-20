import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {eq} from 'formula'
import UserStore from '../stores/user'
import moment from 'moment'
import {
  requestLog
} from '../stores/webutils'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'

class UserReport extends React.Component {
  state = {
    loaded: false,
    loading: false
  };

  componentDidMount() {

    if (UserStore.isUserLoggedIn()) {

      this.setState({ loading: true })

      requestLog(this.props.router.params.log_id)
      .then(log => this.setState({
        loading: false,
        loaded: true,
        log: log
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

    var {log} = this.state

    return (
      <div className="log-view wrapper">
        <div className="page-heading">
          <h1>Log</h1>
        </div>
        <div className="log-detail">
          <label>ID</label>
          <div>{log.id}</div>
          <label>Resource</label>
          <div>{log.method} {log.url}</div>
          <label>Date</label>
          <div>{moment(log.ts).format()}</div>
          <label>Status</label>
          <div>{log.status}</div>
          <label>IP Address</label>
          <div>{log.ip}</div>
          <label>API Version</label>
          <div>{log.version}</div>
          <label>Request Body</label>
          <div style={{ backgroundColor: '#EEE'}}>
            <Markdown
              source={ '```json\n' + JSON.stringify(log.requestBody, null, 4) + '\n```' }
              options={ markdownOptions }
              />
          </div>
          <label>Response Body</label>
          <div style={{ backgroundColor: '#EEE'}}>
            <Markdown
              source={ '```json\n' + JSON.stringify(log.responseBody, null, 4) + '\n```' }
              options={ markdownOptions }
              />
          </div>
          <label>Request Headers</label>
          <div style={{ backgroundColor: '#EEE'}}>
            <Markdown
              source={ '```json\n' + JSON.stringify(log.requestHeaders, null, 4) + '\n```' }
              options={ markdownOptions }
              />
          </div>
          <label>Response Headers</label>
          <div style={{ backgroundColor: '#EEE'}}>
            <Markdown
              source={ '```json\n' + JSON.stringify(log.responseHeaders, null, 4) + '\n```' }
              options={ markdownOptions }
              />
          </div>
          <label>User</label>
          <div style={{ backgroundColor: '#EEE'}}>
            <Markdown
              source={ '```json\n' + JSON.stringify(log.user, null, 4) + '\n```' }
              options={ markdownOptions }
              />
          </div>
        </div>
      </div>
    )
  }
}

export default UserReport
