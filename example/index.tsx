import 'react-app-polyfill/ie11'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Node } from 'slate'

import { RichTextEditor } from '../src'
import { full } from '../src/data/full'

const App = () => {
  const [value, setValue] = React.useState<Node[]>(full)
  return (
    <div>
      <RichTextEditor value={value} onChange={setValue} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
