import React, { useState } from 'react'
import { Node } from 'slate'

import RichText from '../src/components'
import { full } from './data/full'
import { galleries } from './data/galleries'
import { image } from './data/image'
import { list } from './data/list'
import { shortcodes } from './data/shortcodes'
import { single } from './data/single'
import { tab } from './data/tab'
import { table } from './data/table'
import { video } from './data/video'
import StoryWrapper from './StoryWrapper'

export default {
  title: 'Rich Text',
}

function Editor({ initialValue }: { initialValue: Node[] }) {
  const [value, setValue] = useState<Node[]>(initialValue)
  return (
    <StoryWrapper>
      <button onClick={() => console.log(JSON.stringify(value))}>Print</button>
      <RichText value={value} onChange={setValue} />
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
