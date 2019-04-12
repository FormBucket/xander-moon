import { h } from "preact";
import { connect } from "unistore/preact";
import Query from "../components/Query";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout {...props}>
    <Query support_email={props.support_email} />
  </Layout>
));
export default Page;
