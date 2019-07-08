import { h } from "preact";
import { connect } from "unistore/preact";
import GuideUpload from "../components/GuideUpload";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideUpload />
  </Layout>
));
export default Page;
