import { h } from "preact";
import { connect } from "unistore/preact";
import GuideRecaptcha from "../components/GuideRecaptcha";
import Layout from "../components/Layout";
import { actions } from "../store";

let Page = connect("menuOn,flash,user", actions)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideRecaptcha />
  </Layout>
));
export default Page;
