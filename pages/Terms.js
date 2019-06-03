import { h } from "preact";
import { connect } from "unistore/preact";
import Terms from "../components/Terms";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <Terms />
  </Layout>
));
export default Page;
