/** @jsx jsx */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useEditor, withReact } from 'slate-react'
import { jsx } from 'theme-ui'

import { Element } from './Element'
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

export default function RichText({
  value,
  onChange,
}: {
  value: Node[]
  onChange: (value: Node[]) => void
}) {
  const renderElement = useCallback(props => <Element {...props} />, [])
  // const [selection, setSelection] = useState<Range | null>(null)
  const editor = useMemo(
    () =>
      withGalleries(
        withTabs(
          withLinks(
            withImages(withShortcuts(withReact(withHistory(createEditor())))),
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
        <Editable
          renderElement={renderElement}
          placeholder="Write some markdown..."
          spellCheck
          autoFocus
        />
      </div>
    </Slate>
  )
}
