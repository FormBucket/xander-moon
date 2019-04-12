import { h } from "preact";
import { connect } from "unistore/preact";
import GuideHoneyPot from "../components/GuideHoneyPot";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideHoneyPot />
  </Layout>
));
export default Page;
