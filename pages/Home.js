import { h } from "preact";
import { connect } from "unistore/preact";
import Welcome from "../components/Welcome";
import Layout from "../components/Layout";
import { actions } from "../store";

let Page = connect("menuOn,flash,user", actions)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <Welcome {...props} />
  </Layout>
));
export default Page;
