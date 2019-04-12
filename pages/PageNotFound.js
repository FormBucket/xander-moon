import { h } from "preact";
import { connect } from "unistore/preact";
import PageNotFound from "../components/PageNotFound";
import Layout from "../components/Layout";

let Page = connect("user")(props => (
  <Layout shouldLoadUser={true} {...props}>
    <PageNotFound {...props} />
  </Layout>
));
export default Page;
