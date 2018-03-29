var React = require('react');
var PropTypes = React.PropTypes;
import Layout from './Layout';
import Loader from './Loader';

let Compare = class extends React.Component {
    render() {
        return (
            <Layout>
                <div className="wrapper">
                    <h2>
            <a id="How_do_they_stack_up_0" />How do we stack up against other
            solutions?
                    </h2>
                    <p>
            FormBucket gives web developers and designers an instant backend for
            any form with a simple URL endpoint. So how are we different, and
            why should you choose us?
                    </p>
                    <ol>
                        <li>
            <strong>No limits</strong> on forms or submissions
                        </li>
                        <li>One simple wallet-friendly flat price</li>
                    </ol>
                    <hr />
                    <h3>
                        <a href="/formbucket-vs-formkeep">FormBucket vs. FormKeep</a>
                    </h3>
                    <hr />
                    <h3>
                        <a href="/formbucket-vs-formspree">FormBucket vs. Formspree</a>
                    </h3>
                    <hr />
                    <h3>
                        <a href="/formbucket-vs-getform">FormBucket vs. GetForm</a>
                    </h3>
                    <hr />
                    <h3>
                        <a href="/formbucket-vs-wufoo">FormBucket vs. Wufoo</a>
                    </h3>
                    <hr />
                    <div class="callout">
                        <div class="signup">
                            <a href="/signup" class="button">
            Get Started with FormBucket
                            </a>
                        </div>
                    </div>
                </div>
            </Layout>
        );

    }

};

export default Compare;
