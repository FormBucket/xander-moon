import { h } from "preact";
import { connect } from "unistore/preact";
import GuideJSONEndpoints from "../components/GuideJSONEndpoints";
import Layout from "../components/Layout";
import { actions } from "../store";

let Page = connect("menuOn,flash,user", actions)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideJSONEndpoints />
  </Layout>
));
export default Page;
