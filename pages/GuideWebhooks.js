import { h } from "preact";
import { connect } from "unistore/preact";
import GuideWebhooks from "../components/GuideWebhooks";
import Layout from "../components/Layout";

let Page = connect("menuOn,flash,user")(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideWebhooks />
  </Layout>
));
export default Page;
