import { h } from "preact";
import { connect } from "unistore/preact";
import GuideIndex from "../components/GuideIndex";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideIndex />
  </Layout>
));
export default Page;
