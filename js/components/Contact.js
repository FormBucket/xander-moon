var React = require('react');
var PropTypes = React.PropTypes;
import Layout from './Layout';
import Loader from './Loader';
import Markdown from 'react-remarkable';
import markdownOptions from '../markdown-options';
import Content from '../contact.md';

let Contact = class extends React.Component {
  componentDidMount() {
    this.timerId = setInterval(() => {
      if (grecaptcha) {
        grecaptcha.render('contact-recaptcha', {
          sitekey: '6LcC9kwUAAAAAKZkAPmBWJeHh13qX4R5jCLlENBT',
          size: 'invisible',
          callback: () => {
            console.log('got callback from recaptcha');
            document.getElementById('formbucket-contact-form').submit();
          }
        });
        clearInterval(this.timerId);
        console.log('cleared');

        document.getElementById('contact-submit').onclick = function(event) {
          console.log('start recaptcha');
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
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Contact us</h1>
          </div>
        </div>
        <div className="wrapper">
          <Markdown source={Content} options={markdownOptions} />
        </div>
      </Layout>
    );
  }
};

export default Contact;
