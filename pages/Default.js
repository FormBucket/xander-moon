import { h } from "preact";
import { connect } from "unistore/preact";
import { actions } from "../src/store";

let Page = connect(
  "error,menuOn,flash,user",
  actions
)(props => (
  <div>
    <div style={{ textAlign: "center" }}>
      <div>
        <h2>Your submission was received!</h2>
        <p>
          Powered by <a href="https://www.formbucket.com">FormBucket</a>
        </p>
      </div>
    </div>
  </div>
));
export default Page;
