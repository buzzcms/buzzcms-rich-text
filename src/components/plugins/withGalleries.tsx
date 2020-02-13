import { ReactEditor } from 'slate-react'

export function withGalleries(editor: ReactEditor) {
  const { isVoid } = editor
  editor.isVoid = element => {
    return element.type === 'galleries' ? true : isVoid(element)
  }
  return editor
}
