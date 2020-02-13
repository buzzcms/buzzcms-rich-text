/** @jsx jsx */

import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { jsx } from 'theme-ui'

import { BlockButton } from './BlockButton'
import { MarkButton } from './MarkButton'

export const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body)
}

export function HoverableToolbar() {
  const editor = useSlate()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    const { selection } = editor
    if (!el) {
      return
    }
    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }
    const domSelection = window.getSelection()
    if (!domSelection) {
      return
    }
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
  })
  return (
    <Portal>
      <div
        ref={ref}
        sx={{
          position: 'absolute',
          p: 2,
          top: -10000,
          left: -10000,
          opacity: 0,
          transition: 'opacity 0.75s',
          bg: '#222',
          mt: -2,
        }}
      >
        <BlockButton format="heading-two">H2</BlockButton>
        <BlockButton format="heading-three">H3</BlockButton>
        <MarkButton format="bold">B</MarkButton>
        <MarkButton format="italic">I</MarkButton>
        <MarkButton format="underline">U</MarkButton>
      </div>
    </Portal>
  )
}
