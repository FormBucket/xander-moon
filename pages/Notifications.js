import { h, Component } from "preact";
import Layout from "../components/Layout";
import Notifications from "../components/Notifications";
import { connect } from "unistore/preact";
import { actions } from "../src/store";

class NotificationsContainer extends Component {
  componentWillMount() {
    let { matches } = this.props;
    let { offset, limit, bucket_id } = matches;
    console.log(matches);
    this.props.loadNotifications(offset, limit, bucket_id);
  }
  componentWillUnmount() {
    this.props.clearNotifications();
  }
  render() {
    let { matches } = this.props;
    let { offset, limit, bucket_id } = matches;
    return (
      <Notifications
        {...this.props}
        offset={offset}
        limit={limit}
        bucket_id={bucket_id}
      />
    );
  }
}

export default connect(
  "error,menuOn,flash,user,bucket,offset,limit,bucket_id,items,user",
  actions
)(props => (
  <Layout {...props}>
    <NotificationsContainer {...props} />
  </Layout>
));
