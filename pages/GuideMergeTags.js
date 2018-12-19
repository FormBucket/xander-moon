import { h } from "preact";
import { connect } from "unistore/preact";
import GuideMergeTags from "../components/GuideMergeTags";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideMergeTags />
  </Layout>
));
export default Page;
