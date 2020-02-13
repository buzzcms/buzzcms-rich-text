import { ReactEditor } from 'slate-react'

export function withTabs(editor: ReactEditor) {
  const { isVoid } = editor
  editor.isVoid = element => {
    return element.type === ['tab-list', 'tab'] ? true : isVoid(element)
  }
  return editor
}
