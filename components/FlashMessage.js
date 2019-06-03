/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import IF from "formula/src/branch";

class FlashMessage extends Component {
  render() {
    return IF(
      this.props.text && typeof this.props.text === "string",
      // you won't miss the giant red box. Now here is your chance to change the color of the beast.
      //
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "#666",
          color: "white",
          textAlign: "center",
          paddingTop: 5,
          fontSize: "2em"
        }}
      >
        {this.props.text}
      </div>,
      <div />
    );
  }
}

export default FlashMessage;
