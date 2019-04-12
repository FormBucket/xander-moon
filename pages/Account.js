import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions, store } from "../store";
import Account from "../components/Account";
import Layout from "../components/Layout";

class AccountContainer extends Component {
  render() {
    return <Account {...this.props} />;
  }
}

export default connect(
  "menuOn,flash,user,isSaving",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <AccountContainer {...props} />
  </Layout>
));
