/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";

let sitekey = "6LcC9kwUAAAAAKZkAPmBWJeHh13qX4R5jCLlENBT";

let Contact = class extends Component {
  componentDidMount() {
    this.timerId = setInterval(() => {
      if (grecaptcha) {
        grecaptcha.render("contact-recaptcha", {
          sitekey,
          size: "invisible",
          callback: () => {
            document.getElementById("formbucket-contact-form").submit();
          }
        });
        clearInterval(this.timerId);

        document.getElementById("contact-submit").onclick = function(event) {
          event.preventDefault();
          grecaptcha.execute();
        };
      }
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>Contact Us</h1>
          </div>
        </div>
        <div class="wrapper">
          <form
            id="formbucket-contact-form"
            action="https://api.formbucket.com/f/vCDgvMn"
            method="post"
          >
            <input type="text" name="name" placeholder="Your name" />
            <input type="text" name="email" placeholder="Email address" />
            <input type="text" name="phone" placeholder="Phone number" />
            <textarea name="message" placeholder="How can we help?" />
            <input type="hidden" name="__honey_trap__" value="" />
            <div
              id="contact-recaptcha"
              class="g-recaptcha"
              data-size="invisible"
              data-sitekey={sitekey}
            />
            <button id="contact-submit">Contact Support</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Contact;
