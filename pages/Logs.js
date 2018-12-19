import { h, Component } from "preact";
import Layout from "../components/Layout";
import Logs from "../components/Logs";
import { connect } from "unistore/preact";
import { actions } from "../store";

class LogsContainer extends Component {
  componentWillMount() {
    this.props.loadLogs(0, 100, this.props.bucket_id);
  }
  componentWillUnmount() {
    this.props.clearLogs();
  }
  render() {
    return <Logs {...this.props} />;
  }
}

export default connect(
  "flash,user,logs",
  actions
)(props => (
  <Layout user={props.user}>
    <LogsContainer {...props} />
  </Layout>
));
