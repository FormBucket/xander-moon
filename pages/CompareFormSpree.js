import { h } from "preact";
import { connect } from "unistore/preact";
import C from "../components/CompareFormKeep";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <C />
  </Layout>
));
export default Page;
