import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store";
import Layout from "../components/Layout";
import Submissions from "../components/Submissions";

class SubmissionsContainer extends Component {
  componentWillMount() {
    let { matches } = this.props;
    this.props.loadSubmissions(matches);
    this.props.loadBucket(matches.id);
  }
  componentWillUnmount() {
    this.props.clearBucket();
  }
  render() {
    return <Submissions {...this.props} />;
  }
}

export default connect(
  "flash,user,bucket,submissions,total,totalSpam,totalDeleted,selected,expanded",
  actions
)(props => (
  <Layout user={props.user}>
    <SubmissionsContainer {...props} />
  </Layout>
));
