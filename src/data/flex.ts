const src = 'https://source.unsplash.com/1600x900/?nature,water'

export const flex = [
  // { type: 'paragraph', children: [{ text: 'Flex example' }] },
  {
    type: 'flex',
    style: {
      flexWrap: 'wrap',
    },
    children: [
      {
        type: 'container',
        style: {
          width: ['100%', '50%'],
          bg: '#dedede',
          p: 2,
        },
        children: [
          {
            type: 'heading-two',
            children: [{ text: 'Heading is contained in a container' }],
          },
          {
            type: 'paragraph',
            children: [{ text: 'This is the first container' }],
          },
        ],
      },
      {
        type: 'container',
        style: {
          width: ['100%', '50%'],
          bg: 'white',
          p: 2,
        },
        children: [
          {
            type: 'heading-two',
            children: [{ text: 'Image is contained in a container' }],
          },
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
        ],
      },
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
  },
]
