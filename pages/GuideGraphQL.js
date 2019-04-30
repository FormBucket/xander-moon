import { h } from "preact";
import { connect } from "unistore/preact";
import GuideGraphQL from "../components/GuideGraphQL";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideGraphQL />
  </Layout>
));
export default Page;
