import { h } from "preact";
import { connect } from "unistore/preact";
import GuideRadioButtons from "../components/GuideRadioButtons";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideRadioButtons />
  </Layout>
));
export default Page;
