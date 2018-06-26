/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

var React = require("react");
var PropTypes = React.PropTypes;
import { IF } from "formula";
import Layout from "./Layout";
import Loader from "./Loader";
import Markdown from "react-remarkable";
import markdownOptions from "../markdown-options";

let loadGuide = name =>
  IF(
    name === "api",
    () => System.import("../guides/api.md"),
    name == "collect-emails-for-newsletter-with-jquery",
    () =>
      System.import("../guides/collect-emails-for-newsletter-with-jquery.md"),
    name === "ajax-only",
    () => System.import("../guides/ajax-only.md"),
    name === "json-endpoints",
    () => System.import("../guides/json-endpoints.md"),
    name === "howto-setup-recaptcha",
    () => System.import("../guides/howto-setup-recaptcha.md"),
    name === "merge-tags",
    () => System.import("../guides/merge-tags.md"),
    name === "file-uploads",
    () => System.import("../guides/file-uploads.md"),
    name === "honeypot",
    () => System.import("../guides/honeypot.md"),
    name === "radio-buttons",
    () => System.import("../guides/radio-buttons.md"),
    name === "webhooks",
    () => System.import("../guides/webhooks.md"),
    name === "general-data-protection-regulation",
    () => System.import("../guides/general-data-protection-regulation.md"),
    () => System.import("../guides/index.md")
  );

let Guide = class extends React.Component {
  state = {
    title: "Docs"
  };

  componentWillMount() {
    let { path } = this.props.router.route;
    let { name } = this.props.router.params;

    loadGuide(name).then(c => this.setState({ content: c }));

    this.setState({
      title: "Guides",
      name: name
        ? name.replace(/(^|-)(.)/g, function(a, b, c) {
            return " " + c.toUpperCase();
          })
        : name
    });
  }

  render() {
    let state = this.state || {};

    if (!state.content) {
      return <Loader />;
    }

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>{state.title}</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>{state.name}</h2>
          <Markdown source={state.content} options={markdownOptions} />
        </div>
      </Layout>
    );
  }
};

export default Guide;
