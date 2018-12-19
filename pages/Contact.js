import { h } from "preact";
import { connect } from "unistore/preact";
import Contact from "../components/Contact";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout user={props.user}>
    <Contact {...props} />
  </Layout>
));
export default Page;
