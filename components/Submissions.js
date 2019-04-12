/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import { route } from "preact-router";
import IF from "formula/src/branch";
import ISBLANK from "formula/src/isblank";
import format from "date-fns/format";
import isSameDay from "date-fns/is_same_day/index";

let color = {
  disabled: "gray",
  enabled: "purple"
};

import "./styles/submissions.scss";

function wrap(props, headingText, output) {
  return (
    <div class="page-submissions">
      <div class="page-heading">
        <div class="wrapper">
          <h1>{headingText}</h1>
        </div>
      </div>
      <div class="wrapper">{output}</div>
    </div>
  );
}

class Submissions extends Component {
  state = {
    submissions: undefined,
    showAll: false,
    selected: [],
    expanded: [],
    loaded: false,
    loading: false
  };

  changeRoute(changes = {}) {
    let params = { ...this.props.matches, ...this.props, ...changes };
    let { id, limit, offset, mode, type = "inbox", select, q } = params;
    this.props.loadSubmissions(params);
    route(
      `/buckets/${id}/submissions/${mode}/${offset}/${limit}/${select}?q=${q ||
        ""}&type=${type}`
    );
  }

  handleSelect = (event, submission) => {
    event.stopPropagation();
    if (this.props.selected.indexOf(submission.id) > -1) {
      this.props.setSelected(
        this.props.selected.filter(d => d !== submission.id)
      );
    } else {
      this.props.setSelected(this.props.selected.concat([submission.id]));
    }
  };

  handleExpand = (event, submission) => {
    event.stopPropagation();
    if (this.props.expanded.indexOf(submission.id) > -1) {
      this.props.setExpanded(
        this.props.expanded.filter(d => d !== submission.id)
      );
    } else {
      this.props.setExpanded(this.props.expanded.concat([submission.id]));
    }
  };

  handleSearch = event => {
    this.changeRoute({
      q: event.target.value
    });
  };

  goForward = event => {
    var {
      props,
      props: { matches }
    } = this;

    var offset = +matches.offset,
      limit = +matches.limit;

    if (this.props.loading) {
      return;
    }
    // console.log('goForward')
    var total = IF(
        matches.type === "spam",
        props.spamCount,
        matches.type === "deleted",
        props.deletedCount,
        props.totalCount
      ),
      newOffset = IF(offset + limit <= total, offset + limit, offset);

    if (offset === newOffset || newOffset >= total) {
      return;
    }

    this.changeRoute({
      offset: newOffset
    });
  };

  goBack = event => {
    var {
      props,
      props: { matches }
    } = this;

    var offset = +this.props.matches.offset,
      limit = +this.props.matches.limit;

    if (this.props.loading) {
      return;
    }

    // console.log('goBack')
    var newOffset = IF(offset - limit > 0, offset - limit, 0),
      total = IF(
        matches.type === "spam",
        props.spamCount,
        props.matches.type === "deleted",
        props.deletedCount,
        props.totalCount
      );

    if (offset === newOffset || offset >= total) {
      return;
    }

    this.changeRoute({
      offset: newOffset
    });
  };

  switchFolder = type => {
    this.changeRoute({
      type,
      offset: 0
    });
  };

  render() {
    var props = this.props,
      { matches, updateSubmissions, destroySubmissions } = props;
    var offset = +matches.offset,
      limit = +matches.limit,
      total = IF(
        matches.type === "spam",
        props.spamCount,
        props.matches.type === "deleted",
        props.deletedCount,
        props.totalCount
      ),
      from = total > 0 ? offset + 1 : 0,
      to = IF(offset + limit < total, offset + limit, total),
      { bucket, submissions } = props;

    let emptyResponse = <div style={{ height: "80vh" }} />;

    if (!bucket) return emptyResponse;
    if (!submissions) return emptyResponse;

    let headingText = IF(
      this.props.bucket.name && this.props.bucket.name.trim().length > 0,
      this.props.bucket.name,
      this.props.bucket.id
    );

    let pager = key => (
      <div key={key}>
        <div class="pagination">
          <p>
            <span class="showing-count">
              Showing {from}-{to} of {total}
            </span>
            <button
              class="secondary small"
              onClick={this.goBack}
              style={{
                cursor: IF(offset > 0, "pointer", "auto"),
                marginRight: "0.5em",
                color: IF(offset > 0, color.enabled, color.disabled),
                borderColor: IF(offset > 0, color.enabled, color.disabled)
              }}
            >
              <i class="fa fa-chevron-left" />
            </button>

            <button
              class="secondary small"
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
              <i class="fa fa-chevron-right" />
            </button>
            {"  "}
            {IF(
              this.props.loading,
              <span
                style={{
                  background: "white",
                  color: "#333",
                  zIndex: 9999
                }}
              >
                <i class="fa fa-spinner" /> Loading...
              </span>,
              null
            )}
          </p>
        </div>
      </div>
    );

    if (props.matches.mode === "list") {
      return wrap(
        props,
        headingText,
        <div>
          <div class="submissions-controls">
            <div class="submissions-actions">
              <div class="paging">
                <a
                  style={{ float: "right" }}
                  href={"/buckets/" + props.bucket.id + "/settings"}
                >
                  <i class="fa fa-gear" /> Settings
                </a>
                {pager("top")}
              </div>
              <div class="dropdown-container">
                <div class="search-bar">
                  <input
                    onKeyUp={event =>
                      IF(event.keyCode === 13, () => this.handleSearch(event))
                    }
                    placeholder="Search all submissions..."
                    defaultValue={this.props.q}
                  />
                </div>

                <ul class="dropdown-items">
                  <a
                    onClick={() =>
                      props.setSelected(
                        props.selected.length === 0
                          ? props.submissions.map(d => d.id)
                          : []
                      )
                    }
                  >
                    <li class="dropdown-item">
                      <i
                        class={
                          props.selected.length === 0
                            ? "fa fa-plus"
                            : "fa fa-minus"
                        }
                      />{" "}
                      {props.selected.length === 0
                        ? "Select all"
                        : "Select none"}
                    </li>
                  </a>
                  {IF(
                    props.expanded.length > 0,
                    <a onClick={() => props.setExpanded([])}>
                      <li class="dropdown-item">
                        <i class="fa fa-compress" /> Collapse
                      </li>
                    </a>,
                    <a
                      onClick={() =>
                        props.setExpanded(props.submissions.map(d => d.id))
                      }
                    >
                      <li class="dropdown-item">
                        <i class="fa fa-expand" /> Expand
                      </li>
                    </a>
                  )}
                  {IF(
                    !ISBLANK(props.matches.type) &&
                      props.matches.type !== "inbox",
                    <a
                      onClick={() =>
                        updateSubmissions({ spam: false, deleted: false })
                      }
                    >
                      <li class="dropdown-item">
                        <i class="fa fa-folder" /> Move to inbox
                      </li>
                    </a>,
                    <a onClick={() => updateSubmissions({ spam: true })}>
                      <li class="dropdown-item">
                        <i class="fa fa-ban" /> Spam
                      </li>
                    </a>
                  )}
                  {IF(
                    props.matches.type !== "deleted",
                    <a onClick={() => updateSubmissions({ deleted: true })}>
                      <li class="dropdown-item">
                        <i class="fa fa-trash-o" /> Delete
                      </li>
                    </a>,
                    <a onClick={() => destroySubmissions()}>
                      <li class="dropdown-item">
                        <i class="fa fa-eraser" /> Destroy
                      </li>
                    </a>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div class="folders">
            <button
              class={IF(
                ISBLANK(props.matches.type) || props.matches.type === "inbox",
                "secondary active",
                "secondary"
              )}
              onClick={event => this.switchFolder("inbox")}
            >
              Inbox <span class="submission-count">{props.totalCount}</span>
            </button>
            <button
              class={IF(
                props.matches.type === "spam",
                "secondary active",
                "secondary"
              )}
              onClick={() => this.switchFolder("spam")}
            >
              Spam <span class="submission-count">{props.spamCount}</span>
            </button>
            <button
              class={IF(
                props.matches.type === "deleted",
                "secondary active",
                "secondary"
              )}
              onClick={() => this.switchFolder("deleted")}
            >
              Deleted <span class="submission-count">{props.deletedCount}</span>
            </button>
          </div>
          <ul class="submissions-list">
            {props.submissions.map((submission, i) => (
              <li key={submission.id}>
                <div
                  class={IF(
                    props.selected.indexOf(submission.id) > -1,
                    "submission-container submission-selected",
                    "submission-container"
                  )}
                  key={i}
                >
                  <div class="submission-heading">
                    <div
                      class="meta"
                      onClick={event => this.handleSelect(event, submission)}
                    >
                      <h3>
                        <input
                          checked={props.selected.indexOf(submission.id) > -1}
                          type="checkbox"
                        />
                        <span
                          onClick={event =>
                            this.handleSelect(event, submission)
                          }
                        >
                          # {total - offset - i}
                          {" - "}
                          <span class="submission-ts">
                            {IF(
                              isSameDay(new Date(), submission.createdOn),
                              format(submission.createdOn, "hh:mm a"),
                              format(submission.createdOn, "MMM DD hh:mm a")
                            )}
                          </span>
                        </span>
                        <i
                          onClick={event =>
                            this.handleExpand(event, submission)
                          }
                          class={IF(
                            props.expanded.indexOf(submission.id) > -1,
                            "fa fa-angle-double-up",
                            "fa fa-angle-double-down"
                          )}
                        />
                      </h3>
                    </div>
                  </div>
                  <div
                    class="submission-body"
                    style={IF(
                      props.expanded.indexOf(submission.id) > -1,
                      {},
                      { display: "none" }
                    )}
                  >
                    {Object.keys(submission.data).map((key, j) => (
                      <div key={i + "|" + j}>
                        <p>
                          <strong>{key}</strong>:{" "}
                          {(submission.data[key] || "").toString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div class="paging">{pager("bottom")}</div>
        </div>
      );
    }

    if (props.matches.mode === "table") {
      return wrap(
        props,
        headingText,
        <div>
          Do the table mode
          {pager}
        </div>
      );
    }

    return <div>Huh, unsupported mode.</div>;
  }
}

export default Submissions;
