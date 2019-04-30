import { h } from "preact";
import { connect } from "unistore/preact";
import PageNotFound from "../components/PageNotFound";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <PageNotFound {...props} />
  </Layout>
));
export default Page;
