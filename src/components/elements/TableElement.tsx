/** @jsx jsx */

import { Manager, Popper, Reference } from 'react-popper'
import { Editor, Path, Transforms } from 'slate'
import { RenderElementProps, useEditor, useSelected } from 'slate-react'
import { jsx } from 'theme-ui'

import { Portal } from '../HoverableToolbar'

function getTableCell(editor: Editor) {
  return Editor.above(editor, {
    match: x => x.type === 'table-cell',
  })
}

function getRow(editor: Editor) {
  return Editor.above(editor, {
    match: x => x.type === 'table-row',
  })
}

function getTable(editor: Editor) {
  return Editor.above(editor, {
    match: x => x.type === 'table',
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

function getTableSize(editor: Editor) {
  const tmp = getTable(editor)
  if (!tmp) {
    return null
  }
  const [node] = tmp
  const firstrRow = node.children[0]
  return { x: firstrRow.children.length, y: node.children.length }
}

function getTableCellPath(editor: Editor) {
  const [, path] =
    Editor.above(editor, {
      match: x => x.type === 'table-cell',
    }) || []
  return path
}

export function isInTableCell(editor: Editor) {
  return !!getTableCell(editor)
}

export function isInRowLastCell(editor: Editor) {
  const path = getTableCellPath(editor)
  const tableSize = getTableSize(editor)
  if (!path || !tableSize) {
    return false
  }
  const [cellIndex] = path.reverse()
  return tableSize.x === cellIndex + 1
}

export function isInTableLastCell(editor: Editor) {
  const path = getTableCellPath(editor)
  const tableSize = getTableSize(editor)
  if (!path || !tableSize) {
    return false
  }
  const [cellIndex, rowIndex] = path.reverse()
  return tableSize.x === cellIndex + 1 && tableSize.y === rowIndex + 1
}

function getNextNodePath(path: Path) {
  const [leaf, ...parent] = path.reverse()
  return [...parent.reverse(), leaf + 1]
}

export function execTabInTable(editor: Editor) {
  const cell = getTableCell(editor)
  if (!cell) {
    return
  }
  const [, path] = cell
  if (isInTableLastCell(editor)) {
    const table = getTable(editor)
    if (!table) {
      return
    }
    const [, tablePath] = table
    const nextPath = getNextNodePath(tablePath)
    Transforms.select(editor, nextPath)
  } else if (isInRowLastCell(editor)) {
    const row = getRow(editor)
    if (!row) {
      return
    }
    const [, rowPath] = row
    const nextPath = getNextNodePath(rowPath)
    Transforms.select(editor, [...nextPath, 0])
  } else {
    const nextPath = getNextNodePath(path)
    Transforms.select(editor, nextPath)
  }
  Transforms.collapse(editor, { edge: 'start' })
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
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )
          }
        </Popper>
      </Portal>
    </Manager>
  )
}
