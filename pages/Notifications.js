import { h, Component } from "preact";
import Layout from "../components/Layout";
import Notifications from "../components/Notifications";
import { connect } from "unistore/preact";
import { actions } from "../store";

class NotificationsContainer extends Component {
  componentWillMount() {
    let { matches } = this.props;
    let { offset, limit, bucket_id } = matches
    console.log(matches)
    this.props.loadNotifications(offset, limit, bucket_id);
  }
  componentWillUnmount() {
    this.props.clearNotifications();
  }
  render() {
    return <Notifications {...this.props} />;
  }
}

export default connect(
  "offset,limit,bucket_id,items,user,total_count",
  actions
)(props => (
  <Layout user={props.user}>
    <NotificationsContainer {...props} />
  </Layout>
));
