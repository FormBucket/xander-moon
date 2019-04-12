import { h } from "preact";
import { connect } from "unistore/preact";
import GuideGDPR from "../components/GuideGDPR";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideGDPR />
  </Layout>
));
export default Page;
