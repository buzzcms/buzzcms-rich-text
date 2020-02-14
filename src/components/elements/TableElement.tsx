/** @jsx jsx */

import { Manager, Popper, Reference } from 'react-popper'
import { Editor, Transforms } from 'slate'
import { RenderElementProps, useEditor, useSelected } from 'slate-react'
import { jsx } from 'theme-ui'

import { Portal } from '../HoverableToolbar'

function getRow(editor: Editor) {
  return Editor.above(editor, {
    match: x => x.type === 'table-row',
  })
}

function makeRow(cellCount: number) {
  const children = [...Array(cellCount).keys()].map(() => ({
    type: 'table-cell',
    children: [{ text: '' }],
  }))
  return {
    type: 'table-row',
    children,
  }
}

function addRow(editor: Editor, append = false) {
  const tmp = getRow(editor)
  if (!tmp) {
    return
  }
  const [node, path] = tmp
  const currentCellIndex = path.pop()
  if (!currentCellIndex) {
    return
  }
  const newCellIndex = append ? currentCellIndex + 1 : currentCellIndex
  Transforms.insertNodes(editor, makeRow(node.children.length), {
    at: [...path, newCellIndex],
  })
}

export function TableElement({ attributes, children }: RenderElementProps) {
  const selected = useSelected()
  const editor = useEditor()
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <table
            ref={ref}
            sx={{
              outline: selected ? '2px solid blue' : 'none',
              position: selected ? 'relative' : 'static',
            }}
          >
            <tbody {...attributes}>{children}</tbody>
          </table>
        )}
      </Reference>
      <Portal>
        <Popper placement="top">
          {({ ref, style, placement, arrowProps }) =>
            selected && (
              <div ref={ref} style={style} data-placement={placement}>
                <button
                  onClick={() => {
                    addRow(editor)
                  }}
                >
                  Prepend row
                </button>
                <button
                  onClick={() => {
                    addRow(editor, true)
                  }}
                >
                  Append row
                </button>
                <button
                  onClick={() => {
                    const tmp = Editor.above(editor, {
                      match: x => x.type === 'table-row',
                    })
                    if (!tmp) {
                      return
                    }
                    const [node, path] = tmp
                    console.log({ node, path })
                  }}
                >
                  Print row
                </button>
                <button
                  onClick={() => {
                    const tmp = Editor.above(editor, {
                      match: x => x.type === 'table',
                    })
                    if (!tmp) {
                      return
                    }
                    const [node, path] = tmp
                    console.log({ node, path })
                  }}
                >
                  Print table
                </button>
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )
          }
        </Popper>
      </Portal>
    </Manager>
  )
}
