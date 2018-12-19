import { h } from "preact";
import { connect } from "unistore/preact";
import GuidePricing from "../components/GuidePricing";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <GuidePricing />
  </Layout>
));
export default Page;
