import isImage from 'is-image'
import { Editor, Element, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export const insertImage = (
  editor: ReactEditor,
  url: string,
  insertBlock = false,
) => {
  const text = { text: '' }
  const image = { type: 'img', src: url, children: [text] }
  if (insertBlock) {
    Transforms.insertNodes(editor, image)
  }
  Transforms.setNodes(editor, image)
}

export const insertImageById = (
  editor: ReactEditor,
  id: string,
  insertBlock = false,
) => {
  const text = { text: '' }
  const image = { type: 'image', id, children: [text] }
  if (insertBlock) {
    Transforms.insertNodes(editor, image)
  }
  Transforms.setNodes(editor, image)
}

function isAbleToPasteImage(editor: ReactEditor) {
  const x = Editor.above(editor, { match: x => Element.isElement(x) })
  const node = x && x[0]
  return node && Editor.isEmpty(editor, node) && node.type === 'paragraph'
}

export function withImages(editor: ReactEditor) {
  const { insertData, isVoid } = editor
  editor.isVoid = element => {
    return ['image', 'img'].includes(element.type) ? true : isVoid(element)
    // return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    // TODO: Try upload image before insert
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
