/** @jsx jsx */

import isHotkey from 'is-hotkey'
import { useCallback, useMemo, useState } from 'react'
import { createEditor, Node, Range } from 'slate'
import { Editable, Slate } from 'slate-react'
import { jsx } from 'theme-ui'

import { EditorInfo } from './EditorInfo'
import { Element } from './elements/Element'
import { Leaf } from './elements/Leaf'
import { execTabInTable, isInTableCell } from './elements/TableElement'
import { HoverableToolbar } from './HoverableToolbar'
import { withEditor } from './plugins'
import { style } from './style'
import { Toolbar } from './Toolbar'
import { toggleMark } from './utils'

const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export default function RichText({
  value,
  onChange,
}: {
  value: Node[]
  onChange: (value: Node[]) => void
}) {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withEditor(createEditor()), [])
  const [selection, setSelection] = useState<Range | null>(null)

  return (
    <Slate
      editor={editor}
      value={value}
      selection={selection}
      onChange={v => {
        onChange(v)
        setSelection(editor.selection)
      }}
    >
      <div sx={style}>
        <HoverableToolbar />
        <Toolbar />
        <EditorInfo selection={selection} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write some markdown..."
          spellCheck
          autoFocus
          onKeyDown={event => {
            if (isInTableCell(editor)) {
              if (event.key === 'Tab') {
                event.preventDefault()
                execTabInTable(editor)
              }
            }
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </div>
    </Slate>
  )
}
