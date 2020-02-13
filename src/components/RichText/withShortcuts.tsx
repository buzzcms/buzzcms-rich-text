import { Editor, Point, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export const SHORTCUTS: { [key: string]: string } = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
}

export function withShortcuts(editor: ReactEditor) {
  const { deleteBackward, insertText } = editor
  editor.insertText = text => {
    const { selection } = editor
    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]
      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(
          editor,
          { type },
          { match: n => Editor.isBlock(editor, n) },
        )
        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }
        return
      }
    }
    insertText(text)
  }
  editor.deleteBackward = (...args) => {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)
        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })
          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
            })
          }
          return
        }
      }
      deleteBackward(...args)
    }
  }
  return editor
}
