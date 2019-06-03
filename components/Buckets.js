/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import { route } from "preact-router";
import "./styles/bucketlist.scss";
import IF from "formula/src/branch";
import ISBLANK from "formula/src/isblank";

class DndListItem extends Component {
  render({ onDragStart, children }) {
    return (
      <div class="dnd-list-item" draggable="true" onDragStart={onDragStart}>
        {children}
      </div>
    );
  }
}

class DndList extends Component {
  onDragStart = (index, ev) => {
    ev.dataTransfer.setData("text", index);
  };
  hit(r, p) {
    return (
      p.x >= r.x && p.x < r.x + r.width && p.y >= r.y && p.y < r.y + r.height
    );
  }
  onDrop = ev => {
    ev.preventDefault();
    let draggedIdx = parseInt(ev.dataTransfer.getData("text"));
    let pos = { x: ev.clientX, y: ev.clientY };
    let children = Array.from(this.base.querySelectorAll(".dnd-list-item"));
    let insertBeforeIdx = null;
    for (let idx = 0, n = children.length; idx < n; ++idx) {
      let childRect = children[idx].getBoundingClientRect();
      if (this.hit(childRect, pos)) {
        this.props.onMoveItem(draggedIdx, idx);
        return;
      }
      // "remember" the first child that's below the cursor position
      if (insertBeforeIdx == null && childRect.y >= pos.y) {
        insertBeforeIdx = idx;
      }
    }
    this.props.onMoveItem(draggedIdx, insertBeforeIdx);
  };
  render({ children }) {
    return (
      <div
        class="dnd-list"
        onDrop={this.onDrop}
        onDragOver={ev => ev.preventDefault()}
      >
        {children.map((it, index) => (
          <DndListItem
            onDragStart={(...args) => this.onDragStart(index, ...args)}
          >
            {it}
          </DndListItem>
        ))}
      </div>
    );
  }
}

class App extends Component {
  render({ items, select, show, moveBucket }, {}) {
    return (
      <ul class="bucket-list">
        <DndList onMoveItem={moveBucket}>
          {items.map(bucket => (
            <div>
              <li key={bucket.id}>
                <div class="bucket-item">
                  <div class="bucket-meta" onClick={() => select(bucket)}>
                    <h3>
                      <i
                        class={
                          "fa toggle-switch fa-" +
                          IF(bucket.enabled, "toggle-on", "toggle-off")
                        }
                      />
                      <span>
                        {IF(ISBLANK(bucket.name), bucket.id, bucket.name)}
                      </span>
                    </h3>
                  </div>
                  <div class="submission-count">
                    <button class="secondary" onClick={() => show(bucket)}>
                      {bucket.submissions ? bucket.submissions.totalCount : "?"}{" "}
                      Submissions <i class="fa fa-chevron-right" />
                    </button>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </DndList>
      </ul>
    );
  }
}

let BucketList = props => {
  if (ISBLANK(props.buckets)) {
    return <div>Loading Buckets...</div>;
  }

  if (props.buckets.length == 0) {
    return (
      <div>You have no buckets. There was never a better time to make one!</div>
    );
  }

  return <App items={props.buckets} moveBucket={props.moveBucket} {...props} />;
};

class Buckets extends Component {
  state = {
    mode: "list",
    buckets: undefined,
    selected_bucket_id: undefined,
    error: false
  };

  handleSelect = bucket => {
    route("/buckets/" + bucket.id + "/settings");
  };

  handleShow = bucket => {
    route(`/buckets/${bucket.id}/submissions/list/0/50/data,created_on`);
    return false;
  };

  render() {
    let { buckets, moveBucket } = this.props || {};
    let state = this.props;

    if (!buckets) return null;

    let Buckets = (
      <BucketList
        buckets={buckets}
        selected_bucket_id={state.selected_bucket_id}
        moveBucket={moveBucket}
        select={this.handleSelect}
        show={this.handleShow}
      />
    );

    return (
      <div>
        <div class="wrapper">
          <div class="callout">
            <p>Buckets store your form data.</p>
            <button onClick={() => this.props.createBucket()}>
              <i class="fa fa-plus" /> Create Bucket
            </button>
          </div>
          <div
            style={{
              padding: 10,
              marginBottom: 10,
              background: "red",
              color: "white",
              display: state.error ? "" : "none"
            }}
          >
            {state.error ? state.error.message : ""}
          </div>
          {state.error ? undefined : Buckets}
        </div>
      </div>
    );
  }
}

export default Buckets;
