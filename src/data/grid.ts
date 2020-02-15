const src = 'https://source.unsplash.com/1600x900/?nature,water'

export const grid = [
  {
    type: 'grid',
    style: {
      '#a': { gridArea: 'a' },
      '#b': { gridArea: 'b' },
      '#c': { gridArea: 'c' },
      '#d': { gridArea: 'd' },
      width: '100%',
      gridTemplateColumns: '50% 25% 25%',
      gridTemplateRows: '70% 30%',
      gridTemplateAreas: `
        'a b b'
        'a c d'
        `,
    },
    children: [
      {
        type: 'container',
        id: 'a',
        children: [
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
        type: 'container',
        id: 'b',
        style: { bg: 'yellow' },
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Area 2' }],
          },
        ],
      },
      {
        type: 'container',
        id: 'c',
        style: { bg: 'green' },
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Area 3' }],
          },
        ],
      },
      {
        type: 'container',
        id: 'd',
        style: { bg: 'gray' },
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Area 4' }],
          },
        ],
      },
    ],
  },
]
