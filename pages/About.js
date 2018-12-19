import { h } from "preact";
import { connect } from "unistore/preact";
import About from "../components/About";
import Layout from "../components/Layout";

let Page = connect("user,support_email")(props => (
  <Layout user={props.user}>
    <About support_email={props.support_email} />
  </Layout>
));
export default Page;
