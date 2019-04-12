import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../src/store";
import Layout from "../components/Layout";
import Buckets from "../components/Buckets";

class BucketsContainer extends Component {
  componentWillMount() {
    this.props.loadBuckets();
  }
  render() {
    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>Buckets</h1>
          </div>
        </div>
        <Buckets {...this.props} />
      </div>
    );
  }
}

export default connect(
  "menuOn,user,buckets",
  actions
)(props => (
  <Layout {...props}>
    <BucketsContainer {...props} />
  </Layout>
));
