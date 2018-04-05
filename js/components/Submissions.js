import React, { PropTypes } from "react";
import { IF, ISBLANK, RUN, EQ } from "formula";
import Markdown from "react-remarkable";
import markdownOptions from "../markdown-options";
import {
  requestBucket,
  requestSubmissionsByBucket,
  requestDeleteSubmission,
  requestDeleteSubmissions,
  requestUpdateSubmissions,
  requestUpdateSubmission
} from "../stores/webutils";
import UserStore from "../stores/user";
import BucketStore from "../stores/buckets";
import SubmissionsStore from "../stores/submissions";
import FontAwesome from "react-fontawesome";
import moment from "moment";
import { router, Link } from "xander";
import Layout from "./Layout";

let color = {
  disabled: "gray",
  enabled: "purple"
};

function wrap(headingText, output) {
  return (
    <Layout>
      <div className="page-heading">
        <div className="wrapper">
          <h1>{headingText}</h1>
        </div>
      </div>
      <div className="wrapper">{output}</div>
    </Layout>
  );
}

class Submissions extends React.Component {
  state = {
    display: "inbox",
    submissions: undefined,
    showAll: false,
    selected: [],
    expanded: [],
    loaded: false,
    loading: false,
    selectToggle: true
  };

  componentWillMount() {
    if (!UserStore.isUserLoggedIn()) {
      router.open("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    let { params } = nextProps.router;
    this.setState({ loading: true });

    Promise.all([
      requestBucket(params.id),
      requestSubmissionsByBucket(
        params.id,
        +params.offset,
        +params.limit,
        params.select,
        nextProps.location.query.q,
        nextProps.location.query.type
      )
    ])
      .then(values =>
        this.setState({
          loading: false,
          loaded: true,
          bucket: values[0],
          total: values[1].total,
          totalSpam: values[1].totalSpam,
          totalDeleted: values[1].totalDeleted,
          submissions: values[1].items,
          expanded: this.state.showAll ? values[1].map(d => d.id) : [],
          first_load: false,
          submission_line_formula: values[0].submission_line_formula
            ? values[0].submission_line_formula
            : `"Submission # " & count`
        })
      )
      .catch(error => this.setState({ error: error }));
  }

  componentWillMount() {
    let { params } = this.props.router;

    let mode = params.mode || "list";
    let limit = +params.limit || 50;
    let offset = +params.offset || 0;
    let select = params.select || "id,created_on,data";

    var url = `/buckets/${
      params.id
    }/submissions/${mode}/${offset}/${limit}/${select}`;

    // console.log(this.props)

    if (this.props.router.location.query.q) {
      router.redirect(url + "&q=" + this.props.router.location.query.q);
    } else {
      router.redirect(url);
    }

    window.scrollTo(0, 0);
  }

  handleBucketsChanged = () => {
    // console.log('handleSubmissionsChanged')
    this.setState({
      bucket: BucketStore.find(this.props.router.params.id)
    });
  };

  handleSubmissionsChanged = () => {
    this.setState({
      submissions: SubmissionsStore.getSubmissions()
    });
  };

  handleDelete = (event, submission) => {
    event.stopPropagation();
    requestDeleteSubmission(this.state.bucket.id, submission.id)
      .then(n => this.search())
      .catch(error => alert(error));
    return false;
  };

  handleDeleteSelected = () => {
    requestUpdateSubmissions(this.state.bucket.id, this.state.selected, {
      deleted: true,
      spam: false
    })
      .then(n => this.search())
      .catch(error => alert(error));

    this.setState({ selected: [] });
  };

  handleDestroySelected = () => {
    requestDeleteSubmissions(this.state.bucket.id, this.state.selected)
      .then(n => this.search())
      .catch(error => alert(error));

    this.setState({ selected: [] });
  };

  handleMoveToInbox = () => {
    requestUpdateSubmissions(this.state.bucket.id, this.state.selected, {
      deleted: false,
      spam: false
    })
      .then(n => this.search())
      .catch(error => alert(error));

    this.setState({ selected: [] });
  };

  handleMarkSelectedSpam = () => {
    requestUpdateSubmissions(this.state.bucket.id, this.state.selected, {
      spam: true
    })
      .then(n => this.search())
      .catch(error => alert(error));

    this.setState({ selected: [] });
  };

  handleMarkSpam = (event, submission, spam = true) => {
    event.stopPropagation();
    requestUpdateSubmission(this.state.bucket.id, submission.id, { spam }).then(
      n => {
        this.setState({
          submissions: this.state.submissions.map(d =>
            IF(d.id === submission.id, Object.assign({}, d, { spam }), d)
          )
        });
      }
    );
  };

  handleSelect = (event, submission) => {
    event.stopPropagation();
    if (this.state.selected.indexOf(submission.id) > -1) {
      this.setState({
        selected: this.state.selected.filter(d => d !== submission.id)
      });
    } else {
      this.setState({ selected: this.state.selected.concat([submission.id]) });
    }
  };

  handleExpand = (event, submission) => {
    event.stopPropagation();
    if (this.state.expanded.indexOf(submission.id) > -1) {
      this.setState({
        expanded: this.state.expanded.filter(d => d !== submission.id)
      });
    } else {
      this.setState({ expanded: this.state.expanded.concat([submission.id]) });
    }
  };

  search = event => {
    var url = `/buckets/${this.props.router.params.id}/submissions/${
      this.props.router.params.mode
    }/0/${this.props.router.params.limit}/${
      this.props.router.params.select
    }?q=${this.refs.q.value}&type=${this.state.display}`;
    this.setState({ selected: [], selectToggle: true });
    router.open(url);
  };

  goForward = event => {
    var offset = +this.props.router.params.offset,
      limit = +this.props.router.params.limit;

    if (this.state.loading) {
      return;
    }
    // console.log('goForward')
    var newOffset = IF(
      offset + limit <= this.state.total,
      offset + limit,
      offset
    );

    if (offset === newOffset || newOffset >= this.state.total) {
      return;
    }

    router.open(
      `/buckets/${this.props.router.params.id}/submissions/${
        this.props.router.params.mode
      }/${newOffset}/${limit}/${this.props.router.params.select}?q=${
        this.refs.q.value
      }&type=${this.state.display}`
    );
  };

  goBack = event => {
    var offset = +this.props.router.params.offset,
      limit = +this.props.router.params.limit;

    if (this.state.loading) {
      return;
    }

    // console.log('goBack')
    var newOffset = IF(offset - limit > 0, offset - limit, 0);

    if (offset === newOffset || offset >= this.state.total) {
      return;
    }

    router.open(
      `/buckets/${this.props.router.params.id}/submissions/${
        this.props.router.params.mode
      }/${newOffset}/${limit}/${this.props.router.params.select}?q=${
        this.refs.q.value
      }&type=${this.state.display}`
    );
  };

  switchFolder = type => {
    this.setState({ display: type });
    var offset = +this.props.router.params.offset,
      limit = +this.props.router.params.limit;

    router.open(
      `/buckets/${this.props.router.params.id}/submissions/${
        this.props.router.params.mode
      }/0/${limit}/${this.props.router.params.select}?q=${
        this.refs.q.value
      }&type=${type}`
    );
  };

  render() {
    // console.log(this.state)

    if (this.state.loaded === false) {
      return (
        <Layout className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </Layout>
      );
    }

    if (ISBLANK(this.props.router.params.id)) {
      return (
        <div className="wrapper">
          <div className="flash">ERROR: No bucket selected!</div>
        </div>
      );
    }

    if (ISBLANK(this.state.bucket)) {
      return (
        <div className="wrapper">
          <div className="flash">ERROR: Cannot find bucket!</div>
        </div>
      );
    }

    if (ISBLANK(this.state.submissions)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      );
    }

    var offset = +this.props.router.params.offset,
      limit = +this.props.router.params.limit,
      total = IF(
        this.state.display === "spam",
        this.state.totalSpam,
        this.state.display === "deleted",
        this.state.totalDeleted,
        this.state.total
      ),
      from = total > 0 ? offset + 1 : 0,
      to = IF(offset + limit < total, offset + limit, total),
      headingText = IF(
        this.state.bucket.name && this.state.bucket.name.trim().length > 0,
        this.state.bucket.name,
        this.state.bucket.id
      );

    let pager = key => (
      <div key={key}>
        <div className="pagination">
          <p>
            <span className="showing-count">
              Showing {from}-{to} of {total}
            </span>
            <button
              className="secondary small"
              onClick={this.goBack}
              style={{
                cursor: IF(offset > 0, "pointer", "auto"),
                marginRight: "0.5em",
                color: IF(offset > 0, color.enabled, color.disabled),
                borderColor: IF(offset > 0, color.enabled, color.disabled)
              }}
            >
              <FontAwesome name="chevron-left" />
            </button>

            <button
              className="secondary small"
              onClick={this.goForward}
              style={{
                cursor: IF(to < total, "pointer", "auto"),
                color: IF(
                  offset + limit < total,
                  color.enabled,
                  color.disabled
                ),
                borderColor: IF(
                  offset + limit < total,
                  color.enabled,
                  color.disabled
                )
              }}
            >
              <FontAwesome name="chevron-right" />
            </button>
            {"  "}
            {IF(
              this.state.loading,
              <span
                style={{
                  background: "white",
                  color: "#333",
                  zIndex: 9999
                }}
              >
                <FontAwesome name="spinner" /> Loading...
              </span>,
              null
            )}
          </p>
        </div>
      </div>
    );

    // console.log(this.state, this.props)

    if (this.props.router.params.mode === "list") {
      return wrap(
        headingText,
        <div>
          <div className="submissions-controls">
            <div className="submissions-actions">
              <div className="paging">
                <Link
                  style={{ float: "right" }}
                  to={"/buckets/" + this.state.bucket.id + "/settings"}
                >
                  <FontAwesome name="gear" /> Settings
                </Link>
                {pager("top")}
              </div>
              <div className="dropdown-container">
                <div className="search-bar">
                  <input
                    onKeyUp={event =>
                      IF(event.keyCode === 13, () => this.search())
                    }
                    ref="q"
                    placeholder="Search all submissions..."
                  />
                </div>

                <ul className="dropdown-items">
                  <a
                    onClick={() =>
                      this.setState({
                        selectToggle: !this.state.selectToggle,
                        selected: this.state.selectToggle
                          ? this.state.submissions.map(d => d.id)
                          : []
                      })
                    }
                  >
                    <li className="dropdown-item">
                      <FontAwesome
                        name={this.state.selectToggle ? "plus" : "minus"}
                      />{" "}
                      {this.state.selectToggle ? "Select all" : "Select none"}
                    </li>
                  </a>
                  {IF(
                    this.state.showAll,
                    <a
                      onClick={() =>
                        this.setState({ showAll: false, expanded: [] })
                      }
                    >
                      <li className="dropdown-item">
                        <FontAwesome name="compress" /> Collapse
                      </li>
                    </a>,
                    <a
                      onClick={() =>
                        this.setState({
                          showAll: true,
                          expanded: this.state.submissions.map(d => d.id)
                        })
                      }
                    >
                      <li className="dropdown-item">
                        <FontAwesome name="expand" /> Expand
                      </li>
                    </a>
                  )}
                  {IF(
                    this.state.display !== "inbox",
                    <a onClick={this.handleMoveToInbox}>
                      <li className="dropdown-item">
                        <FontAwesome name="folder" /> Move to inbox
                      </li>
                    </a>
                  )}
                  {IF(
                    this.state.display !== "deleted",
                    <a onClick={this.handleDeleteSelected}>
                      <li className="dropdown-item">
                        <FontAwesome name="trash-o" /> Delete
                      </li>
                    </a>,
                    <a onClick={this.handleDestroySelected}>
                      <li className="dropdown-item">
                        <FontAwesome name="eraser" /> Destroy
                      </li>
                    </a>
                  )}
                  {IF(
                    this.state.display === "inbox",
                    <a onClick={this.handleMarkSelectedSpam}>
                      <li className="dropdown-item">
                        <FontAwesome name="ban" /> Spam
                      </li>
                    </a>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="folders">
            <button
              className={IF(
                this.state.display === "inbox",
                "secondary active",
                "secondary"
              )}
              onClick={event => this.switchFolder("inbox")}
            >
              Inbox <span className="submission-count">{this.state.total}</span>
            </button>
            <button
              className={IF(
                this.state.display === "spam",
                "secondary active",
                "secondary"
              )}
              onClick={() => this.switchFolder("spam")}
            >
              Spam{" "}
              <span className="submission-count">{this.state.totalSpam}</span>
            </button>
            <button
              className={IF(
                this.state.display === "deleted",
                "secondary active",
                "secondary"
              )}
              onClick={() => this.switchFolder("deleted")}
            >
              Deleted{" "}
              <span className="submission-count">
                {this.state.totalDeleted}
              </span>
            </button>
          </div>
          <ul className="submissions-list">
            {this.state.submissions.map((submission, i) => (
              <li key={submission.id}>
                <div
                  className={IF(
                    this.state.selected.indexOf(submission.id) > -1,
                    "submission-container submission-selected",
                    "submission-container"
                  )}
                  key={i}
                >
                  <div className="submission-heading">
                    <div className="meta">
                      <h3
                        onClick={event => this.handleExpand(event, submission)}
                      >
                        <input
                          onClick={event =>
                            this.handleSelect(event, submission)
                          }
                          checked={
                            this.state.selected.indexOf(submission.id) > -1
                          }
                          type="checkbox"
                        />
                        {RUN(
                          this.state.submission_line_formula,
                          Object.assign({}, submission.data, {
                            count: total - offset - i
                          })
                        )}
                        <FontAwesome
                          name={IF(
                            this.state.expanded.indexOf(submission.id) > -1,
                            "angle-double-up",
                            "angle-double-down"
                          )}
                        />
                        <span className="submission-ts">
                          ({IF(
                            moment(submission.created_on).isSame(
                              moment(),
                              "day"
                            ),
                            moment(submission.created_on).format("hh:mm a"),
                            moment(submission.created_on).format(
                              "MMM DD hh:mm a"
                            )
                          )})
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div
                    className="submission-body"
                    style={IF(
                      this.state.expanded.indexOf(submission.id) > -1,
                      {},
                      { display: "none" }
                    )}
                  >
                    {Object.keys(submission.data).map((key, j) => (
                      <div key={i + "|" + j}>
                        <p>
                          <strong>{key}</strong>
                          : {(submission.data[key] || "").toString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="paging">{pager("bottom")}</div>
        </div>
      );
    }

    if (this.props.router.params.mode === "table") {
      return wrap(
        headingText,
        <div>
          Do the table mode
          {pager}
        </div>
      );
    }

    if (EQ(this.props.router.params.mode, "json")) {
      return wrap(
        headingText,
        <table className="bucket-list">
          <thead>
            <tr>
              <th>
                {this.state.bucket.name}

                {pager("top")}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.submissions.map((submission, i) => (
              <tr
                key={i}
                style={{ marginBottom: 10, borderBottom: "1px solid black" }}
              >
                <td>
                  <Markdown
                    source={
                      "```JSON\n" +
                      JSON.stringify(submission, null, 4) +
                      "\n```"
                    }
                    options={markdownOptions}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <div>Huh, unsupported mode.</div>;
  }
}

export default Submissions;
