/** @jsx jsx */

import { RenderLeafProps } from 'slate-react'
import { jsx } from 'theme-ui'

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.strike) {
    children = <s>{children}</s>
  }
  return <span {...attributes}>{children}</span>
}
