import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../src/store";
import Layout from "../components/Layout";
import Submissions from "../components/Submissions";

class SubmissionsContainer extends Component {
  componentWillMount() {
    let { matches } = this.props;
    this.props.loadSubmissions(matches);
  }
  componentWillUnmount() {
    this.props.clearBucket();
  }
  render() {
    return <Submissions {...this.props} />;
  }
}

export default connect(
  "menuOn,flash,user,bucket,submissions,totalCount,spamCount,deletedCount,selected,expanded",
  actions
)(props => (
  <Layout {...props}>
    <SubmissionsContainer {...props} />
  </Layout>
));
