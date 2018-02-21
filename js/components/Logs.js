import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {eq, branch} from 'formula'
import UserStore from '../stores/user'
import moment from 'moment'
import {
  requestLogs
} from '../stores/webutils'
import Layout from './Layout'

import {Link, router} from 'xander'

class UserReport extends React.Component {
  state = {
    submissions: undefined,
    loaded: false,
    loading: false
  };

  componentWillMount() {
    let {offset, limit} = this.props.router.location.query;
    if (!offset) {
      router.redirect('/logs?offset=0&limit=10')
    }
  }

  componentDidMount() {

    if (UserStore.isUserLoggedIn()) {

      let {offset, limit, bucket_id} = this.props.router.location.query;
      requestLogs(offset, limit, bucket_id)
      .then(logs => this.setState({
        currentOffset: offset,
        loading: false,
        loaded: true,
        logs: logs
      }))
      .catch(error => this.setState({ error: error }))

    }
  }

  handleLoadBack() {
    this.setState({ loadingMore: true, currentOffset: this.state.offset })
    let { limit, bucket_id} = this.props.router.location.query;

    let {logs, currentOffset} = this.state
    let newOffset = +currentOffset-(+limit)

    requestLogs(newOffset, (+limit), bucket_id)
    .then(newLogs => {
      this.setState({
        currentOffset: newOffset,
        loadingMore: false,
        logs: newLogs
      })
      router.redirect('/logs?offset=' + newOffset + '&limit=' + limit + (bucket_id ? `&bucket_id=${bucket_id}` : ''))
    })
    .catch(error => this.setState({ error: error }))
  }

  handleLoadNext() {
    this.setState({ loadingMore: true, currentOffset: this.state.offset })
    let { limit, bucket_id} = this.props.router.location.query;
    let {logs, currentOffset} = this.state
    let newOffset = +currentOffset+(+limit)
    requestLogs(newOffset, (+limit), bucket_id)
    .then(newLogs => {
      this.setState({
        currentOffset: newOffset,
        loadingMore: false,
        logs: newLogs
      })
      router.redirect('/logs?offset=' + newOffset + '&limit=' + limit + (bucket_id ? `&bucket_id=${bucket_id}` : ''))
    })
    .catch(error => this.setState({ error:	 error }))
  }

  render() {

    if (eq(this.state.loaded, false)) {
      return (
        <Layout className="wrapper">
          <div className="flash">

    <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </Layout>
      )
    }

    let bucket,
    {bucket_id} =this.props.router.location.query;

    if (bucket_id) {
      bucket = this.props.buckets.byid[bucket_id][0]
    }

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Logs
              {
                branch(
                  this.props.router.location.query.bucket_id,
                  <span> &gt; {
                    bucket ? bucket.name :
                    this.props.router.location.query.bucket_id
                  }</span>
                )
              }
            </h1>

          </div>
        </div>
        <div className="wrapper">
          <table>
            <tr>
              <th>status</th>
              <th width="150">date</th>
            </tr>
            {
              this.state.logs.map((d, i) => (
                <tr>
                  <td>{d.status} <Link to={`/log/${d.id}`}>{d.method} {d.url}</Link></td>
                  <td>{moment(d.ts).format("MMM DD, YYYY hh:mm a")}</td>
                </tr>
              ))
            }
          </table>
          <button disabled={+this.state.currentOffset == 0} onClick={this.handleLoadBack.bind(this)}>Back</button>

          {' '}<button onClick={this.handleLoadNext.bind(this)}>Next</button> Showing {+this.props.router.location.query.offset+1} to {(+this.props.router.location.query.offset)+1+(+this.state.logs.length)}
        </div>
      </Layout>
    )
  }
}

export default UserReport
