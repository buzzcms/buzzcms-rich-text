import isImage from 'is-image'
import { Editor, Element, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import { getAboveBlockType } from './withShortcuts'

export const insertImage = (editor: ReactEditor, url: string) => {
  const image = {
    type: 'figure',
    children: [
      { type: 'image', src: url, children: [{ text: '' }] },
      { type: 'figcaption', children: [{ text: 'Enter your caption' }] },
    ],
  }
  Transforms.insertNodes(editor, image)
}

function isAbleToPasteImage(editor: ReactEditor) {
  const x = Editor.above(editor, { match: x => Element.isElement(x) })
  const node = x && x[0]
  return node && Editor.isEmpty(editor, node) && node.type === 'paragraph'
}

export function withImages(editor: ReactEditor) {
  const { insertData, isVoid, insertBreak } = editor
  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertBreak = () => {
    const type = getAboveBlockType(editor)
    insertBreak()
    if (type === 'figcaption') {
      Transforms.liftNodes(editor)
    }
  }
  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data
    if (files && files.length > 0) {
      for (const file of files as any) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            if (typeof url !== 'string') {
              console.warn('Url is not valid string')
              return
            }
            insertImage(editor, url.toString())
          })
          reader.readAsDataURL(file)
        }
      }
    } else if (isImage(text) && isAbleToPasteImage(editor)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }
  return editor
}
