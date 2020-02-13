import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

const isEnd = (editor: ReactEditor) => {
  if (!editor.selection) {
    return false
  }
  const { anchor } = editor.selection
  return Editor.isEnd(editor, anchor, anchor.path)
}

const isInsertNewParagraph = (editor: ReactEditor) => {
  console.log(editor.selection)
  const [match] = Editor.nodes(editor, {
    match: n => {
      return n.type === 'list-item'
    },
  })
  return match
}

export function withGalleries(editor: ReactEditor) {
  const { isVoid, insertBreak } = editor
  editor.isVoid = element => {
    return element.type === 'galleries' ? true : isVoid(element)
  }

  editor.insertBreak = () => {
    if (!isEnd(editor)) {
      insertBreak()
    } else {
      // TODO: Move me to separate module
      if (isInsertNewParagraph(editor)) {
        Transforms.insertNodes(editor, {
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
