/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

var React = require("react");
var PropTypes = React.PropTypes;
import Layout from "./Layout";
import Loader from "./Loader";
import Markdown from "react-remarkable";
import markdownOptions from "../markdown-options";
import Content from "../terms.md";

let Terms = class extends React.Component {
  render() {
    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Terms of Service</h1>
          </div>
        </div>
        <div className="wrapper">
          <Markdown source={Content} options={markdownOptions} />
        </div>
      </Layout>
    );
  }
};

export default Terms;
