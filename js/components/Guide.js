var React = require('react');
var PropTypes = React.PropTypes;
import {branch, match} from 'formula';
import Layout from './Layout';
import Loader from './Loader';
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'

let loadGuide = name => branch(
  name === 'api',
  () => System.import('../guides/api.md'),
  name == 'collect-emails-for-newsletter-with-jquery',
  () => System.import('../guides/collect-emails-for-newsletter-with-jquery.md'),
  name === 'ajax-only',
  () => System.import('../guides/ajax-only.md'),
  name === 'howto-setup-recaptcha',
  () => System.import('../guides/howto-setup-recaptcha.md'),
  name === 'merge-tags',
  () => System.import('../guides/merge-tags.md'),
  name === 'file-uploads',
  () => System.import('../guides/file-uploads.md'),
  name === 'honeypot',
  () => System.import('../guides/honeypot.md'),
  name === 'radio-buttons',
  () => System.import('../guides/radio-buttons.md'),
  () => System.import('../guides/index.md'),
)

let Guide = class extends React.Component {

  componentDidMount(props) {
    let {path} = this.props.router.route;
    let {name} = this.props.router.params;
    console.log('got props', path, name)

    loadGuide(name)
    .then( c => this.setState({ content: c }))

    this.setState({
      name: name ? name.replace(/(^|-)(.)/g, function(a, b, c) { return " " + c.toUpperCase(); }) : name,
      title: 'Guides'
    })
  }

  componentWillReceiveProps(props) {
    let {path} = props.router.route;
    let {name} = props.router.params;
    console.log('got props', path, name)

    loadGuide(name)
    .then( c => this.setState({ content: c }))

    this.setState({
      name: name ? name.replace(/(^|-)(.)/g, function(a, b, c) { return " " + c.toUpperCase(); }) : name,
      title: 'Guides'
    })
  }

  render() {
    let state = this.state || {}

    if (!state.content) {
      return <Loader />
    }

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>{state.title}{ state.name ? ' > ' + state.name : null}</h1>
          </div>
        </div>
        <div className="wrapper">
          <Markdown
            source={ state.content }
            options={ markdownOptions }
            />
        </div>

      </Layout>
    );
  }
};

export default Guide;
