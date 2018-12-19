import { h } from "preact";
import { connect } from "unistore/preact";
import Terms from "../components/Terms";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <Terms />
  </Layout>
));
export default Page;
