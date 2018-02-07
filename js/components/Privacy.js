var React = require('react');
var PropTypes = React.PropTypes;
import {branch, match} from 'formula';
import Layout from './Layout';
import Loader from './Loader';
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import Content from '../privacy-policy.md'

let Privacy = class extends React.Component {

  render() {
    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Privacy Policy</h1>
          </div>
        </div>
        <div className="wrapper">
          <Markdown
            source={ Content }
            options={ markdownOptions }
            />
        </div>

      </Layout>
    );
  }
};

export default Privacy;
