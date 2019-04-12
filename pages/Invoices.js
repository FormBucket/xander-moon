import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../src/store";
import Invoices from "../components/Invoices";
import Layout from "../components/Layout";

class InvoicesContainer extends Component {
  componentWillMount() {
    this.props.loadInvoices();
  }
  render() {
    return <Invoices {...this.props} />;
  }
}

export default connect(
  "menuOn,flash,user,invoices",
  actions
)(props => (
  <Layout {...props}>
    <InvoicesContainer {...props} />
  </Layout>
));
