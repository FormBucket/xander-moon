import { h } from "preact";
import { connect } from "unistore/preact";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "menuOn,flash,user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <Contact {...props} />
  </Layout>
));
export default Page;
