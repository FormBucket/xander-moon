import { h } from "preact";
import { connect } from "unistore/preact";
import GuideWebhooks from "../components/GuideWebhooks";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideWebhooks />
  </Layout>
));
export default Page;
