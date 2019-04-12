import { h } from "preact";
import { connect } from "unistore/preact";
import GuidePricing from "../components/GuidePricing";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuidePricing />
  </Layout>
));
export default Page;
