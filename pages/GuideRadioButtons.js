import { h } from "preact";
import { connect } from "unistore/preact";
import GuideRadioButtons from "../components/GuideRadioButtons";
import Layout from "../components/Layout";
import { actions } from "../store";

let Page = connect("menuOn,flash,user", actions)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideRadioButtons />
  </Layout>
));
export default Page;
