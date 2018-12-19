import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store";
import Layout from "../components/Layout";
import Buckets from "../components/Buckets";

class BucketsContainer extends Component {
  componentWillMount() {
    this.props.loadBuckets();
  }
  render() {
    return <Buckets {...this.props} />;
  }
}

export default connect(
  "user,buckets",
  actions
)(({ user, buckets, loadBuckets, createBucket }) => (
  <Layout user={user}>
    <BucketsContainer
      user={user}
      buckets={buckets}
      loadBuckets={loadBuckets}
      createBucket={createBucket}
    />
  </Layout>
));
