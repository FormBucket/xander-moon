import { h } from "preact";
import { connect } from "unistore/preact";
import Privacy from "../components/Privacy";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <Privacy />
  </Layout>
));
export default Page;
