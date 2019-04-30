/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";
import registerImg from "../img/recaptcha-step1.png";

let GuideRecaptcha = () => (
  <Guide title="Guides" title2="Howto Setup Recaptcha">
    <div>
      <span>
        <p>
          Recaptcha is a service from Google that works to prevent bots from
          filling out your forms.
        </p>
        <h2>Step 1</h2>
        <p>
          <a href="https://www.google.com/recaptcha/intro/index.html">
            Register your site
          </a>{" "}
          with Google's recaptcha service.
        </p>
        <p>
          <img src={registerImg} alt="Register site" />
        </p>
        <h2>Step 2</h2>
        <p>Add the code to your form.</p>
        <p>
          First, add a <strong>script</strong> tag into the head.
        </p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">script</span>{" "}
              <span class="hljs-attr">src</span>=
              <span class="hljs-string">
                'https://www.google.com/recaptcha/api.js'
              </span>
              &gt;
            </span>
            <span class="undefined" />
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">script</span>&gt;
            </span>
          </code>
        </pre>
        <p>
          Second, put the <strong>div</strong> tag in the position you wish to
          display recaptcha.
        </p>
        <pre>
          <code class="language-html">
            <span class="hljs-tag">
              &lt;<span class="hljs-name">div</span>{" "}
              <span class="hljs-attr">class</span>=
              <span class="hljs-string">"g-recaptcha"</span>
              <span class="hljs-attr">data-sitekey</span>=
              <span class="hljs-string">
                "6Lc_YSgTAAAAAPdIJ5hVuFFNvoljmLYx3E1d6kcu"
              </span>
              &gt;
            </span>
            <span class="hljs-tag">
              &lt;/<span class="hljs-name">div</span>&gt;
            </span>
          </code>
        </pre>
        <p>
          The <strong>Site key</strong> is provided by Google and can be shared
          with the public.
        </p>
        <h2>Step 3</h2>
        <p>
          Enable recaptcha in your bucket's settings. Our server needs a{" "}
          <strong>Secret key</strong> provided by Google. This is used in the
          verification process to ensure that the user is not a robot.
        </p>
        <p>
          Optionally, you may provide a redirect url if the verification fails.
          Otherwise, the user will be redirected back to the page with your
          form.
        </p>
        <h2>Prevent submit with JavaScript</h2>
        <p>
          It is also possible to prevent the user from submitting the form with
          JavaScript.
        </p>
        <p>Here is an example that uses jQuery and Google's recaptcha API.</p>
        <pre>
          <code class="language-js">
            {`$(function(){" "}
    {$("form").submit(function() {
        if (grecaptcha.getResponse() == "") {
            alert("Please complete recaptcha!");
            return false;
        }
    })}
)`}
          </code>
        </pre>
        <p>Hope this helps and we wish you luck keeping bots at bay!</p>
        <h2>Invisible reCaptcha</h2>
        <p>Don't want the annoying "I'm not a robot" shown on your page.</p>
        <p>
          Our backend service works the same if your form implements regular or
          invisible recaptcha.
        </p>
        <p>
          <a href="https://developers.google.com/recaptcha/docs/invisible">
            Google's instructions
          </a>
        </p>
      </span>
    </div>
  </Guide>
);
export default GuideRecaptcha;
