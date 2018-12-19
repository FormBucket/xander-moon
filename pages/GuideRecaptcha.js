import { h } from "preact";
import { connect } from "unistore/preact";
import GuideRecaptcha from "../components/GuideRecaptcha";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideRecaptcha />
  </Layout>
));
export default Page;
