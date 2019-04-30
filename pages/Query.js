import { h } from "preact";
import { connect } from "unistore/preact";
import Query from "../components/Query";
import Layout from "../components/Layout";
import { actions } from "../src/store";

let Page = connect(
  "user",
  actions
)(props => (
  <Layout shouldLoadUser={true} {...props}>
    <Query support_email={props.support_email} />
  </Layout>
));
export default Page;
