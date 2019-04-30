import { h } from "preact";
import { connect } from "unistore/preact";
import C from "../components/CompareFormKeep";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadViewer={true} {...props}>
    <C />
  </Layout>
));
export default Page;
