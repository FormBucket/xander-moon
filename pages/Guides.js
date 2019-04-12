import { h } from "preact";
import { connect } from "unistore/preact";
import GuideIndex from "../components/GuideIndex";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideIndex {...props} />
  </Layout>
));
export default Page;
