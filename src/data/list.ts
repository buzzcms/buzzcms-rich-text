export const list = [
  { type: 'heading-one', children: [{ text: 'List example' }] },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [
          { text: 'Our Pick for ' },
          { text: 'best coffee', bold: true },
          { text: ' subscription 2020' },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Amazing single origin beans sourced from all over the world',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text:
              'Feels like you’re on a guided tour of the world of coffee beans',
          },
        ],
      },
      { type: 'list-item', children: [{ text: 'Prices start at $9' }] },
    ],
  },
  {
    type: 'numbered-list',
    children: [
      {
        type: 'list-item',
        children: [
          { text: 'Our Pick for ' },
          { text: 'best coffee', bold: true },
          { text: ' subscription 2020' },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text: 'Amazing single origin beans sourced from all over the world',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text:
              'Feels like you’re on a guided tour of the world of coffee beans',
          },
        ],
      },
      { type: 'list-item', children: [{ text: 'Prices start at $9' }] },
    ],
  },
]
