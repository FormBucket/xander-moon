/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import * as webutils from "../src/webutils";

class Log extends Component {
  constructor() {
    super();
    this.state = this.updateDimensions();
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let update = {
      width: window.innerWidth,
      height: window.innerHeight - 64
    };
    this.setState(update);
    return update;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let { height, width } = this.state;
    return (
      <div>
        <iframe
          src={webutils.server + "/graphql"}
          style={{
            border: "none",
            width: width,
            height: height
          }}
        />
      </div>
    );
  }
}

export default Log;
