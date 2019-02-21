import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../store";
import Invoices from "../components/Invoices";
import Layout from "../components/Layout";

class InvoicesContainer extends Component {
  componentWillMount() {}
  render() {
    return <Invoices {...this.props} />;
  }
}

export default connect(
  "flash,user",
  actions
)(({ user }) => (
  <Layout user={user}>
    <InvoicesContainer user={user} />
  </Layout>
));
