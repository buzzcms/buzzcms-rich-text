import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { BlockType } from './types'

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor: ReactEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

export const toggleBlock = (editor: ReactEditor, format: BlockType) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
