/** @jsx jsx */

import isHotkey from 'is-hotkey'
import { useCallback, useMemo } from 'react'
import { createEditor, Editor, Node, Range } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'
import { jsx } from 'theme-ui'

import { Element } from './elements/Element'
import { Leaf } from './elements/Leaf'
import { HoverableToolbar } from './HoverableToolbar'
import { withGalleries } from './plugins/withGalleries'
import { withHtml } from './plugins/withHtml'
import { withImages } from './plugins/withImages'
import { withLinks } from './plugins/withLinks'
import { withShortcuts } from './plugins/withShortcuts'
import { withTabs } from './plugins/withTabs'
import { Toolbar } from './Toolbar'
import { toggleMark } from './utils'

const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'alt+x': 'show',
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

  const editor = useMemo(
    () =>
      withGalleries(
        withTabs(
          withLinks(
            withHtml(
              withImages(withShortcuts(withReact(withHistory(createEditor())))),
            ),
          ),
        ),
      ),
    [],
  )

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
          p: 3,
          maxWidth: 960,
          mx: 'auto',
          ul: {
            listStyle: 'disc',
            margin: '0 0 1.5em 3em',
          },
          blockquote: {
            bg: 'yellow',
            mx: 0,
            p: 3,
          },
          '[data-reach-tab-panel]': {
            p: 3,
            bg: '#efefef',
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
                if (mark === 'show') {
                  const { selection } = editor
                  if (!selection) {
                    return
                  }
                  if (!Range.isCollapsed(selection)) {
                    return
                  }
                  const { anchor } = selection
                  const [[node]] = Editor.nodes(editor, {
                    at: anchor,
                    match: n => n.type === 'list-item',
                  })
                  const text = Editor.string(editor, selection)
                  console.log({ text, node })
                }
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </div>
    </Slate>
  )
}