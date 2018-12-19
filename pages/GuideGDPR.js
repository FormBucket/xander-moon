import { h } from "preact";
import { connect } from "unistore/preact";
import GuideGDPR from "../components/GuideGDPR";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideGDPR />
  </Layout>
));
export default Page;
