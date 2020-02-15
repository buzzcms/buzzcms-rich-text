/** @jsx jsx */

import { useCallback, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { Editable, Slate } from 'slate-react'
import { jsx } from 'theme-ui'

import { Element } from './elements/Element'
import { Leaf } from './elements/Leaf'
import { withEditor } from './plugins'
import { style } from './style'

export default function Viewer({ value }: { value: Node[] }) {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withEditor(createEditor()), [])

  return (
    <Slate editor={editor} value={value} onChange={console.log}>
      <div sx={style}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write some markdown..."
          spellCheck
          autoFocus
        />
      </div>
    </Slate>
  )
}
