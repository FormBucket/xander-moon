import { h } from "preact";
import { connect } from "unistore/preact";
import Privacy from "../components/Privacy";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout shouldLoadUser={true} {...props}>
    <Privacy />
  </Layout>
));
export default Page;
