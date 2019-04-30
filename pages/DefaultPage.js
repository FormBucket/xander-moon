import { h } from "preact";
import { connect } from "unistore/preact";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = cmp =>
  connect(
    "error,menuOn,flash,user",
    actions
  )(props => (
    <Layout shouldLoadUser={true} {...props}>
      h(cmp)
    </Layout>
  ));
export default Page;
