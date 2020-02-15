/** @jsx jsx */

import '@reach/dialog/styles.css'

import Dialog, { DialogProps } from '@reach/dialog'
import clone from 'clone-deep'
import { useState } from 'react'
import { Node } from 'slate'
import { jsx } from 'theme-ui'

import { flex } from '../data/flex'
import { grid } from '../data/grid'
import { tab } from '../data/tab'
import { table } from '../data/table'
import Viewer from './Viewer'

export interface WidgetItem {
  name: string
  labels?: string[]
  data: Node[]
}

export interface WidgetDialogProps extends DialogProps {
  onSelectWidget: (widget: WidgetItem | null) => void
}

const templates: WidgetItem[] = [
  {
    name: 'Heading',
    data: [{ type: 'heading-one', children: [{ text: 'Heading example' }] }],
  },
  {
    name: 'Grid',
    data: grid,
  },
  {
    name: 'Flex',
    data: flex,
  },
  {
    name: 'Table',
    data: table,
  },
  {
    name: 'Tab',
    data: tab,
  },
]

export function WidgetDialog({ onSelectWidget, ...props }: WidgetDialogProps) {
  const [selected, setSelected] = useState<WidgetItem | null>(null)
  return (
    <Dialog
      title="Select template"
      aria-label="Select widget to insert"
      {...props}
    >
      <div sx={{ display: 'flex' }}>
        <div sx={{ width: '50%' }}>
          {templates.map(x => (
            <div
              key={x.name}
              sx={{
                border: '1px solid gray',
                bg: x === selected ? 'gray' : 'white',
              }}
              onClick={() => setSelected(x)}
            >
              {x.name}
            </div>
          ))}
        </div>
        <div sx={{ width: '50%' }}>
          {selected && <Viewer value={selected.data} />}
        </div>
      </div>
      <button
        onClick={() => {
          if (!selected) {
            onSelectWidget(null)
            return
          }
          onSelectWidget({
            name: selected.name,
            labels: selected?.labels,
            data: clone(selected?.data),
          })
        }}
      >
        Select
      </button>
    </Dialog>
  )
}
