var React = require('react');
var PropTypes = React.PropTypes;
import Layout from './Layout';
import Loader from './Loader';
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import Content from '../about.md'

let About = class extends React.Component {

  render() {
    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Powering forms is our mission.</h1>
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

export default About;
