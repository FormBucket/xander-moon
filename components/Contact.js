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
            console.log("got callback from recaptcha");
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
            <h1>Contact us</h1>
          </div>
        </div>
        <div class="wrapper">
          <p>
            We love feedback! You can always reach us on Twitter
            [@formbucket](https://twitter.com/FormBucket) too.
          </p>
          <form
            id="formbucket-contact-form"
            action="https://api.formbucket.com/f/vCDgvMn"
            method="post"
          >
            <input type="text" name="name" placeholder="Your full name" />
            <input type="text" name="email" placeholder="Your email address" />
            <input type="text" name="phone" placeholder="Your phone number" />
            <textarea name="message" placeholder="What's on your mind?" />
            <input type="hidden" name="__honey_trap__" value="" />
            <div
              id="contact-recaptcha"
              class="g-recaptcha"
              data-size="invisible"
              data-sitekey={sitekey}
            />
            <button id="contact-submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Contact;
