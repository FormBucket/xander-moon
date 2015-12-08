import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'

let content = `
## Do we need FAQs?

Yes

## Will this product be awesome?

Yes

| test | test |
|-|-|
| does | this work |
`
const FAQs = React.createClass({
  render () {
    return (
      <div id="faqs">
        <Markdown source={content} />
      </div>
    )
  }
})

export default FAQs
