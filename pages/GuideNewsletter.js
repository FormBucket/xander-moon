import { h } from "preact";
import { connect } from "unistore/preact";
import GuideNewsletter from "../components/GuideNewsletter";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideNewsletter />
  </Layout>
));
export default Page;
