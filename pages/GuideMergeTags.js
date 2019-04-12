import { h } from "preact";
import { connect } from "unistore/preact";
import GuideMergeTags from "../components/GuideMergeTags";
import Layout from "../components/Layout";
import { actions } from "../store";

let Page = connect("menuOn,flash,user", actions)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideMergeTags />
  </Layout>
));
export default Page;
