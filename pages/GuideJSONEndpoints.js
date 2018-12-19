import { h } from "preact";
import { connect } from "unistore/preact";
import GuideJSONEndpoints from "../components/GuideJSONEndpoints";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideJSONEndpoints />
  </Layout>
));
export default Page;
