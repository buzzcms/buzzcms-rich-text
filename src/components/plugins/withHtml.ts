import { Transforms } from 'slate'
import { jsx } from 'slate-hyperscript'
import { ReactEditor } from 'slate-react'

const ELEMENT_TAGS: { [key: string]: any } = {
  A: (el: any) => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  DIV: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
}

const IMAGE_TAGS: { [key: string]: any } = {
  IMG: (el: any) => ({ type: 'image', src: el.getAttribute('src') }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS: { [key: string]: any } = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  B: () => ({ bold: true }),
  U: () => ({ underline: true }),
}

export const deserialize = (el: any) => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }

  const { nodeName } = el
  let parent = el

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }

  const children: any[] = Array.from(parent.childNodes)
    .map(deserialize)
    .reduce((acc, val) => acc.concat(val), [])

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    return jsx('element', attrs, children)
  }

  if (IMAGE_TAGS[nodeName]) {
    const attrs = IMAGE_TAGS[nodeName](el)
    return {
      type: 'figure',
      children: [
        jsx('element', attrs, children),
        { type: 'figcaption', children: [{ text: 'Enter your caption' }] },
      ],
    }
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    return children
      .filter(x => typeof x === 'string')
      .map(child => {
        return jsx('text', attrs, child)
      })
  }

  return children
}
export const withHtml = (editor: ReactEditor) => {
  const { insertData } = editor

  editor.insertData = data => {
    const html = data.getData('text/html')

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html')
      const fragment = deserialize(parsed.body).map((x: any) => {
        if (!x.children) {
          return x
        }
        // Fix <p><img /></p> from source data; <figure /> cannot be nested in <p />
        if (x.children[0]?.type === 'figure') {
          return x.children[0]
        }
        return x
      })
      Transforms.insertFragment(editor, fragment)
      return
    }
    insertData(data)
  }

  return editor
}
