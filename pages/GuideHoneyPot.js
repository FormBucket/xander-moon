import { h } from "preact";
import { connect } from "unistore/preact";
import GuideHoneyPot from "../components/GuideHoneyPot";
import Layout from "../components/Layout";

let Page = connect("menuOn,flash,user")(props => (
  <Layout shouldLoadUser={true} {...props}>
    <GuideHoneyPot />
  </Layout>
));
export default Page;
