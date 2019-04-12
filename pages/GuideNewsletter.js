import { h } from "preact";
import { connect } from "unistore/preact";
import GuideNewsletter from "../components/GuideNewsletter";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideNewsletter />
  </Layout>
));
export default Page;
