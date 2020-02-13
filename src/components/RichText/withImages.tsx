import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export const insertImage = (editor: ReactEditor, url: string) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const insertImageById = (editor: ReactEditor, id: string) => {
  const text = { text: '' }
  const image = { type: 'image', id, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const isImageUrl = (url: string) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return ext && imageExtensions.includes(ext)
}

export function withGalleries(editor: ReactEditor) {
  const { isVoid } = editor
  editor.isVoid = element => {
    return element.type === 'galleries' ? true : isVoid(element)
  }
  return editor
}

export function withImages(editor: ReactEditor) {
  const { insertData, isVoid } = editor
  editor.isVoid = element => {
    return ['image', 'img'].includes(element.type) ? true : isVoid(element)
    // return element.type === 'image' ? true : isVoid(element)
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
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }
  return editor
}
