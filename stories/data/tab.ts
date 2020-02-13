const src = 'https://source.unsplash.com/1600x900/?nature,water'

export const tab = [
  { type: 'heading-one', children: [{ text: 'Tab example' }] },
  {
    type: 'tabs',
    items: [
      { title: 'Tab 01', children: [{ text: '' }] },
      { title: 'Tab 02', children: [{ text: '' }] },
      { title: 'Tab 03', children: [{ text: '' }] },
    ],
    children: [
      {
        type: 'tab-panel',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is end of the tab',
              },
            ],
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
                children: [{ text: 'This image is embeded in a Tab Panel' }],
              },
            ],
          },
        ],
      },
      {
        type: 'tab-panel',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is the second tabs',
              },
            ],
          },
        ],
      },
      {
        type: 'tab-panel',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is the third tabs',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'This is end of the tab',
      },
    ],
  },
]
