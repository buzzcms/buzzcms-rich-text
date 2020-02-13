/** @jsx jsx */

import isHotkey from 'is-hotkey'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Editor, Node } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderLeafProps,
  Slate,
  useEditor,
  withReact,
} from 'slate-react'
import { jsx } from 'theme-ui'

import { Element } from './Element'
import { withHtml } from './plugins/withHtml'
import { withLinks } from './plugins/withLinks'
import { withGalleries } from './withGalleries'
import { withImages } from './withImages'
import { withShortcuts } from './withShortcuts'
import { withTabs } from './withTabs'

export function Panel() {
  const editor = useEditor()
  const [selected, setSelected] = useState(() => getSelection())
  useEffect(() => {
    setSelected(getSelection())
  }, [editor.selection])

  return (
    <div>
      <div>{selected?.type}</div>
    </div>
  )
}

const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
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
            borderLeft: '4px solid #1D4E89',
            bg: '',
            mx: 0,
            px: 3,
            color: '#1D4E89',
            fontStyle: 'italic',
          },
          '[data-reach-tab-panel]': {
            p: 3,
            bg: '#efefef',
          },
        }}
      >
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
