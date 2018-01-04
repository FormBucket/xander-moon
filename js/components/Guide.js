var React = require('react');
var PropTypes = React.PropTypes;
import {branch} from 'formula';
import Layout from './Layout';

let index = (
  <div className="wrapper">
    <div>
      <span>
        <h2>Docs</h2>
        <h3><a href="/guides/api">API Docs</a></h3>
        <p>Check out the FormBucket API with examples.</p>
        <hr/>
        <h2>Guides</h2>
        <h3><a href="/guides/collect-emails-for-newsletter-with-jquery-and-ajax">Collect emails with jQuery and AJAX</a></h3>
        <p>In this tutorial we'll show you how to set up a simple newsletter signup form to capture emails using FormBucket, jQuery and AJAX.</p>
        <hr/>
        <h3><a href="/guides/howto-setup-recaptcha">Set Up reCAPTCHA</a></h3>
        <p>Recaptcha is a service from Google that works to prevent bots from filling out your forms.</p>
        <hr/>
        <h3><a href="/guides/merge-tags">Merge Tags</a></h3>
        <p>Personalize your autoresponder emails with merge tags.</p>
        <hr/>
        <h3><a href="/guides/ajax-only">AJAX Only?</a></h3>
        <p>The "AJAX Only?" option sets up an endpoint that always returns a JSON object.</p>
        <hr/>
        <h3><a href="/guides/file-uploads">File Uploads</a></h3>
        <p>Let us know if you'd like FormBucket to support file uploads for your buckets.</p>
        <h3><a href="/guides/honeypot">Honey Pot</a></h3>
        <p>Learn about honeypot. A common technique to defeat simple spam bots.</p>
        <hr/>
        <p>Can't find what you're looking for? Please <a href="/contact">contact us</a> for help.</p>
      </span>
    </div>
  </div>
)

let apiContent = (
  <div>
    API Content TBD
  </div>
)

let Guide = class extends React.Component {
  render() {
    let {path} = this.props.router.route;
    let {name} = this.props.router.params;
    console.log(path, name)

    let [title, content] = branch(
      path === "/guides",
      ['Guides', index],
      path === "/guides/:name",
      branch(
        name === "api",
        ['API', apiContent],
        ['API', <div>API Content error</div>],
        ),
      ['Guides', index]
    )
    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Guides</h1>
          </div>
        </div>
        <div className="wrapper">
          {content}
        </div>

      </Layout>
    );
  }
};

export default Guide;
