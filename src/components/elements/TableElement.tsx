/** @jsx jsx */

import { Manager, Popper, Reference } from 'react-popper'
import { RenderElementProps, useSelected } from 'slate-react'
import { jsx } from 'theme-ui'

import { Portal } from '../HoverableToolbar'

export function TableElement({ attributes, children }: RenderElementProps) {
  const selected = useSelected()
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
                <button onClick={console.log}>Click me</button>
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )
          }
        </Popper>
      </Portal>
    </Manager>
  )
}
