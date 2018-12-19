import { h } from "preact";
import { connect } from "unistore/preact";
import Welcome from "../components/Welcome";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <Welcome {...props} />
  </Layout>
));
export default Page;
