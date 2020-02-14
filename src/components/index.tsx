/** @jsx jsx */

import isHotkey from 'is-hotkey'
import { useCallback, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { Editable, Slate } from 'slate-react'
import { jsx } from 'theme-ui'

import { Element } from './elements/Element'
import { Leaf } from './elements/Leaf'
import { HoverableToolbar } from './HoverableToolbar'
import { withEditor } from './plugins'
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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={v => {
        onChange(v)
      }}
    >
      <div
        sx={{
          bg: 'white',
          p: 4,
          maxWidth: 768,
          mx: 'auto',
          ul: {
            listStyle: 'disc',
            margin: '0 0 1.5em 3em',
          },
          ol: {
            margin: '0 0 1.5em 3em',
            p: 0,
          },
          '[data-reach-tabs]': { my: 3 },
          '[data-reach-tab-panel]': {
            p: 3,
            bg: '#f7f7f7',
          },
          '[data-reach-tab]': {
            p: 3,
            textTransform: 'uppercase',
            fontSize: 's',
          },
          '[data-reach-tab-list]': { bg: '#fcfcfc' },
          '[data-reach-tab][data-selected]': {
            borderTop: '4px solid #231f20',
            borderBottom: 'none',
            bg: '#f7f7f7',
          },
          blockquote: {
            bg: '#f7f7f7',
            mx: 0,
            p: 4,
            borderLeft: '4px solid #231f20',
          },
          mark: {
            bg: '#FFF7A8',
          },
          hr: {
            borderTop: '3px dotted #e6e6e6',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          },
          table: {
            borderSpacing: 0,
            width: '100%',
          },
          td: {
            p: 1,
            borderBottom: '2px solid gray',
          },
          '[data-reach-accordion-item]': {
            mb: 2,
          },
          '[data-reach-accordion-panel]': {
            border: '1px solid gray',
            p: 2,
          },
          '[data-reach-accordion-button]': {
            width: '100%',
            bg: 'primary',
            color: 'white',
            p: 2,
            fontSize: 'f5',
            textAlign: 'left',
            border: 'none',
          },
        }}
      >
        <HoverableToolbar />
        <Toolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write some markdown..."
          spellCheck
          autoFocus
          onKeyDown={(event: any) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
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
