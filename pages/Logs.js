import { h, Component } from "preact";
import Layout from "../components/Layout";
import Logs from "../components/Logs";
import { connect } from "unistore/preact";
import { actions } from "../src/store";

class LogsContainer extends Component {
  componentWillMount() {
    this.props.loadLogs(
      this.props.matches.offset,
      this.props.matches.limit,
      this.props.bucket_id
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.matches.offset !== nextProps.matches.offset)
      this.props.loadLogs(
        nextProps.matches.offset,
        nextProps.matches.limit,
        nextProps.bucket_id
      );
  }
  componentWillUnmount() {
    this.props.clearLogs();
  }
  render() {
    return <Logs {...this.props} />;
  }
}

export default connect(
  "error,menuOn,flash,user,bucket,logs",
  actions
)(props => (
  <Layout {...props}>
    <LogsContainer {...props} />
  </Layout>
));
