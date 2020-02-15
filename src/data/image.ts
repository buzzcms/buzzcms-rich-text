const src = 'https://source.unsplash.com/1600x900/?nature,water'

export const image = [
  { type: 'heading-one', children: [{ text: 'Image example' }] },
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
        children: [{ text: 'You can edit the caption here' }],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
]
