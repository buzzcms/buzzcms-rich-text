import { Editor, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { BlockType } from '../types'

export const SHORTCUTS: {
  [key: string]: BlockType
} = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '1.': 'numbered-list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
}

function getBlockText(editor: ReactEditor) {
  const block = Editor.above(editor, {
    match: n => Editor.isBlock(editor, n),
  })
  const path = block ? block[1] : []
  return Editor.string(editor, path)
}

const isEnd = (editor: ReactEditor) => {
  if (!editor.selection) {
    return false
  }
  const { anchor } = editor.selection
  return Editor.isEnd(editor, anchor, anchor.path)
}

function getAboveBlockType(editor: ReactEditor) {
  const tmp = Editor.above(editor, {
    match: n => Editor.isBlock(editor, n),
  })
  return tmp && tmp[0].type
}

export function withShortcuts(editor: ReactEditor) {
  const { insertText, insertBreak } = editor
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
          { type: type === 'numbered-list-item' ? 'list-item' : type },
          { match: n => Editor.isBlock(editor, n) },
        )
        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }
        if (type === 'numbered-list-item') {
          const list = { type: 'numbered-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }
        return
      }
    }
    insertText(text)
  }

  editor.insertBreak = () => {
    if (!isEnd(editor)) {
      insertBreak()
    } else {
      const type = getAboveBlockType(editor)
      if (type === 'list-item') {
        const text = getBlockText(editor)
        if (text !== '') {
          insertBreak()
          return
        }
        Transforms.setNodes(editor, {
          type: 'paragraph',
          children: [{ text: '' }],
        })
        Transforms.liftNodes(editor)
        return
      }
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      })
    }
  }
  return editor
}
