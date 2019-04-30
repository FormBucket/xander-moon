import { h } from "preact";
import { connect } from "unistore/preact";
import GuideRadioButtons from "../components/GuideRadioButtons";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideRadioButtons />
  </Layout>
));
export default Page;
