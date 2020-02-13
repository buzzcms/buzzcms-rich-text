import { Node } from 'slate'

const src = 'https://source.unsplash.com/1600x900/?nature,water'

export const defaultValue: Node[] = [
  {
    type: 'heading-one',
    children: [
      {
        text: 'Header 1',
      },
    ],
  },
  {
    type: 'galleries',
    items: [
      { id: 1, caption: 'Image 01', src },
      { id: 2, caption: 'Image 02', src },
      { id: 3, caption: 'Image 03', src },
      { id: 4, caption: 'Image 04', src },
      { id: 5, caption: 'Image 05', src },
      { id: 6, caption: 'Image 06', src },
    ],
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'The editor gives you full control over the logic you can add. For example, it\'s fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with "> " you get a blockquote that looks like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Order when you start a line with "## " you get a level-two heading, like this:',
      },
    ],
  },
  {
    type: 'image',
    url: src,
    aspectRatio: 1,
    alt: 'Some Image',
    children: [{ text: '' }],
  },
  // {
  //   type: 'image',
  //   url:
  //     src,
  //   aspectRatio: 1,
  //   alt: 'Some Image',
  //   children: [{ text: '' }],
  // },
  {
    type: 'figure',
    children: [
      {
        type: 'img',
        src,
        children: [{ text: '' }],
      },
      {
        type: 'figcaption',
        children: [{ text: 'This is the caption' }],
      },
    ],
  },
  {
    type: 'heading-two',
    children: [{ text: 'Try it out!' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Try it out for yourself! Try starting a new line with ">", "-", or "#"s.',
      },
    ],
  },
]
