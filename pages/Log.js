import { h, Component } from "preact";
import Layout from "../components/Layout";
import Log from "../components/Log";
import { connect } from "unistore/preact";
import { actions } from "../store";

class LogContainer extends Component {
  componentWillMount() {
    this.props.loadLog(this.props.id);
  }
  componentWillUnmount() {
    this.props.clearLog();
  }
  render() {
    return <Log {...this.props} />;
  }
}

export default connect(
  "menuOn,flash,user,log",
  actions
)(props => (
  <Layout {...props}>
    <LogContainer {...props} />
  </Layout>
));
