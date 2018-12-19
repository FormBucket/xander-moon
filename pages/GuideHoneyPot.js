import { h } from "preact";
import { connect } from "unistore/preact";
import GuideHoneyPot from "../components/GuideHoneyPot";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuideHoneyPot />
  </Layout>
));
export default Page;
