import { h, Component } from "preact";
import Layout from "../components/Layout";
import Bucket from "../components/Bucket";
import { connect } from "unistore/preact";
import { actions } from "../store";

class BucketContainer extends Component {
  componentWillMount() {
    this.props.loadBucket(this.props.matches.id);
  }
  componentWillUnmount() {
    this.props.clearBucket();
  }
  render() {
    return <Bucket {...this.props} />;
  }
}

export default connect(
  "menuOn,flash,user,unsavedBucket,savedBucket",
  actions
)(props => (
  <Layout {...props}>
    <BucketContainer {...props} />
  </Layout>
));
