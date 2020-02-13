import React, { useState } from 'react'
import { Node } from 'slate'

import RichText from '../src/components/RichText'
import { galleries } from './data/galleries'
import { image } from './data/image'
import { list } from './data/list'
import { tab } from './data/tab'
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

Galleries.story = {
  name: 'Galleries',
}

export const List = () => {
  return <Editor initialValue={list} />
}

List.story = {
  name: 'List',
}

export const Image = () => {
  return <Editor initialValue={image} />
}

Image.story = {
  name: 'Image',
}

export const Tab = () => {
  return <Editor initialValue={tab} />
}

Tab.story = {
  name: 'Tab',
}
