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
import { RichTextViewer } from './RichTextViewer'

export interface WidgetItem {
  name: string
  image?: string
  labels?: string[]
  data: Node[]
}

export interface WidgetDialogProps extends DialogProps {
  onSelectWidget: (widget: WidgetItem | null) => void
}

const templates: WidgetItem[] = [
  {
    name: 'Heading',
    image: 'https://media.connected.com.vn/heading.svg',
    data: [{ type: 'heading-one', children: [{ text: 'Heading example' }] }],
  },
  {
    name: 'Grid',
    image: 'https://media.connected.com.vn/grids.svg',
    data: grid,
  },
  {
    name: 'Flex',
    image: 'https://media.connected.com.vn/flexs.svg',
    data: flex,
  },
  {
    name: 'Table',
    image: 'https://media.connected.com.vn/table.svg',
    data: table,
  },
  {
    name: 'Tab',
    image: 'https://media.connected.com.vn/tab.svg',
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
      <div
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          bg: 'nearWhite',
        }}
      >
        {templates.map(x => (
          <div
            key={x.name}
            sx={{
              width: 'calc(100%/3)',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              bg: x === selected ? 'gainsboro' : 'nearWhite',
              p: 3,
            }}
            onClick={() => setSelected(x)}
          >
            <div
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'center',
              }}
            >
              <img src={x.image} sx={{ width: 28 }} />
              <div
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  mt: 2,
                  fontSize: 'm',
                }}
              >
                {x.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div sx={{ width: '100%' }}>
        {selected && <RichTextViewer value={selected.data} />}
      </div>
      {selected && (
        <div sx={{ textAlign: 'center' }}>
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
            sx={{
              bg: 'primary',
              color: 'white',
              px: 3,
              py: 2,
              cursor: 'pointer',
            }}
          >
            <span sx={{ fontSize: 'm' }}>Insert</span>
          </button>
        </div>
      )}
    </Dialog>
  )
}
