import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store";
import Account from "../components/Account";
import Layout from "../components/Layout";

class AccountContainer extends Component {
  componentWillMount() {}
  render() {
    return <Account {...this.props} />;
  }
}

export default connect(
  "flash,user",
  actions
)(({ user }) => (
  <Layout user={user}>
    <AccountContainer user={user} />
  </Layout>
));
