/** @jsx jsx */

import { useEffect, useState } from 'react'
import { Editor, Range } from 'slate'
import { useEditor } from 'slate-react'
import { jsx } from 'theme-ui'

export function getCurrentElement(editor: Editor) {
  const { selection } = editor
  if (!selection) {
    return null
  }
  const node = Editor.above(editor, { at: selection.anchor.path })
  return node
}

export function EditorInfo({ selection }: { selection: Range | null }) {
  const editor = useEditor()
  const [info, setInfo] = useState<any>(null)
  useEffect(() => {
    const tmp = getCurrentElement(editor)
    if (!tmp) {
      return
    }
    const [node, path] = tmp
    setInfo({ node, path })
  }, [selection])

  if (!info) {
    return <div>No node is selected</div>
  }

  const { node, path } = info
  return (
    <div>
      <div>{node?.type || 'paragraph'}</div>
      <div>{path.join(', ')}</div>
    </div>
  )
}
