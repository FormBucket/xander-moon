import { h } from "preact";
import { connect } from "unistore/preact";
import C from "../components/CompareGetForm";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <C />
  </Layout>
));
export default Page;
