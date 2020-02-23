import React, { useState } from 'react'
import { Node } from 'slate'

import { RichTextEditor } from '../src'
import { accordion } from '../src/data/accordion'
import { flex } from '../src/data/flex'
import { full } from '../src/data/full'
import { galleries } from '../src/data/galleries'
import { grid } from '../src/data/grid'
import { image } from '../src/data/image'
import { list } from '../src/data/list'
import { shortcodes } from '../src/data/shortcodes'
import { single } from '../src/data/single'
import { tab } from '../src/data/tab'
import { table } from '../src/data/table'
import { video } from '../src/data/video'
import StoryWrapper from './StoryWrapper'

export default {
  title: 'Rich Text',
}

function Editor({ initialValue }: { initialValue: Node[] }) {
  const [value, setValue] = useState<Node[]>(initialValue)
  const [, setIsShowInsertDialog] = useState(false)
  return (
    <StoryWrapper>
      <button
        onClick={() => console.log(JSON.stringify(value))}
        sx={{ display: 'block', width: '100%' }}
      >
        Print
      </button>
      <button
        onClick={() => setIsShowInsertDialog(true)}
        sx={{
          cursor: 'pointer',
          px: 3,
          py: 2,
          fontSize: 14,
          color: 'primary',
          border: '1 solid',
          borderColor: 'primary',
          display: 'block',
          width: '100%',
        }}
      >
        Insert block
      </button>
      <RichTextEditor value={value} onChange={setValue} />
    </StoryWrapper>
  )
}

export const Galleries = () => {
  return <Editor initialValue={galleries} />
}

export const List = () => {
  return <Editor initialValue={list} />
}

export const Image = () => {
  return <Editor initialValue={image} />
}

export const Tab = () => {
  return <Editor initialValue={tab} />
}
export const Table = () => {
  return <Editor initialValue={table} />
}

export const Video = () => {
  return <Editor initialValue={video} />
}

export const Full = () => {
  return <Editor initialValue={full} />
}
export const Single = () => {
  return <Editor initialValue={single} />
}
export const Shortcodes = () => {
  return <Editor initialValue={shortcodes} />
}

export const Accordion = () => {
  return <Editor initialValue={accordion} />
}

export const Flex = () => {
  return <Editor initialValue={flex} />
}

export const Grid = () => {
  return <Editor initialValue={grid} />
}
