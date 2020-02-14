const src = 'https://source.unsplash.com/400x225/?nature,water'

export const full = [
  { type: 'heading-one', children: [{ text: 'Product List Review' }] },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'This post is specialized formatted to review list of products with shortcodes and typography.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The ' },
      { text: 'DEW Rich Text Editor', bold: true },
      {
        text:
          " aims to provide you the comfort, easy of mind, and the joy of formatting document that suites your needs. That's why we implement both the Markdown format and WYSIWYG editor.",
      },
    ],
  },
  {
    type: 'heading-two',
    children: [{ text: 'Use heading 2 to make your subtitle pop.' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'In the body, use ' },
      { text: 'bold text', bold: true },
      { text: ', ' },
      { text: 'italic text, or ', italic: true },
      { text: 'underline text,', underline: true },
      { text: ' or ' },
      { text: 'combine all', bold: true, italic: true, underline: true },
      { text: ' to emphasize your paragraph. Even ' },
      { text: 'strikethrough text', strike: true },
      { text: ' to get more attention.' },
    ],
  },
  { type: 'hr', children: [{ text: '' }] },
  {
    type: 'mark',
    children: [
      {
        text:
          'Creating a distinct block with horizontal line and highlight text is even more effective to catch readers‘ eyes.',
      },
    ],
  },
  { type: 'hr', children: [{ text: '' }] },
  {
    type: 'heading-three',
    children: [{ text: 'Use heading 3 for detail subtitle.' }],
  },
  {
    type: 'heading-four',
    children: [{ text: 'Dew Editor support heading 4' }],
  },
  {
    type: 'heading-five',
    children: [{ text: "up to Heading 5, if you'd like to." }],
  },
  {
    type: 'paragraph',
    children: [
      { text: '' },
      { type: 'link', url: 'http://dew.vn/', children: [{ text: 'Link' }] },
      { text: ' is easily create just by copy and paste to the Editor.' },
    ],
  },
  {
    type: 'figure',
    children: [
      {
        type: 'img',
        src:
          'http://bestfridgereview.com/img/Cooluli-Electric-Portable-Thermoelectric-System.jpg',
        children: [{ text: '' }],
        alt: 'thermoelectric-refrigerator',
      },
      { type: 'figcaption', children: [{ text: 'Photo Source' }] },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'This is how an unordered list look like:' }],
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [
          { text: 'Sed lorem aliquam eget, vehicula voluptate et eaque nec.' },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text:
              'Odio hac volutpat in malesuada, vulputate facilis imperdiet nec.',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          { text: 'Ligula dolor sodales lorem, blandit phasellus nulla cras.' },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            text:
              'Duis mus tortor in, feugiat ea in mauris, auctor in erat aliquet, amet eu mauris adipiscing vel.',
          },
        ],
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'This is the blockquote with nice layout.' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'The' },
      { text: ' ', italic: true },
      { text: 'sticky toolbar', bold: true, italic: true },
      { text: ' ', bold: true },
      {
        text:
          'stay at the end of the page will help you format your document fast and easily.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'If you are a keyboard hero, here are the Keyboard shortcut:' },
    ],
  },
  { type: 'paragraph', children: [{ text: '<table here>' }] },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Top list review is utterly popular in affiliate marketing. People love to choose. But beware, try not to provide them too many options which will result in confuse and shopping abandonment.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'The optimal products in a list should be somewhere between 3 to 10. But my own experience tells me that the maximum 6 work best.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: "To maximize reader's experience, " },
      { text: 'Dew Editor ', bold: true },
      {
        text:
          'provides you plenty of shortcodes that are easily embed to content such as:',
      },
    ],
  },
  {
    type: 'numbered-list',
    children: [
      { type: 'list-item', children: [{ text: 'Image Gallery' }] },
      { type: 'list-item', children: [{ text: 'Image Slider' }] },
      { type: 'list-item', children: [{ text: 'Tab with Content' }] },
      { type: 'list-item', children: [{ text: 'FAQs Accordions' }] },
      {
        type: 'list-item',
        children: [{ text: 'The Pros vs Cons Comparison' }],
      },
      { type: 'list-item', children: [{ text: 'Product Snippet' }] },
      { type: 'list-item', children: [{ text: 'Review Box' }] },
      { type: 'list-item', children: [{ text: 'Opt-in Box' }] },
      { type: 'list-item', children: [{ text: 'Columns' }] },
      { type: 'list-item', children: [{ text: 'Table' }] },
      { type: 'list-item', children: [{ text: 'Reference Box' }] },
      { type: 'list-item', children: [{ text: 'Video Snippet' }] },
      { type: 'list-item', children: [{ text: 'Pinterest Pin Snippet' }] },
      { type: 'list-item', children: [{ text: 'Instagram Snippet' }] },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Here are some ideas to implement shortcodes to your post to keep reader engaged:',
      },
    ],
  },
  { type: 'heading-three', children: [{ text: '1. Image Gallery' }] },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Image Gallery adds visual enhancement to the product you are reviewing. This allows reader to have the perspective view of the product they are considering to purchase.',
      },
    ],
  },
  {
    type: 'galleries',
    items: [
      {
        id: 1,
        caption: 'Image 01',
        src: 'https://source.unsplash.com/400x225/?nature,water',
      },
      {
        id: 2,
        caption: 'Image 02',
        src: 'https://source.unsplash.com/400x225/?nature,water',
      },
      {
        id: 3,
        caption: 'Image 03',
        src: 'https://source.unsplash.com/400x225/?nature,water',
      },
      {
        id: 4,
        caption: 'Image 04',
        src: 'https://source.unsplash.com/400x225/?nature,water',
      },
    ],
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'The images data can be composed manually (free) or automatically pull from the site you declare with paid add-on.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Image Gallery can be inserted to content by using the shortcode: [[image-gallery]]',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'To learn more about how to declare image gallery data, click here.',
      },
    ],
  },
  { type: 'heading-three', children: [{ text: '2. Image Slider' }] },
  { type: 'heading-three', children: [{ text: '3. Tab with Content' }] },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Tab with Content is powerful element that gives reader the overview look of what products are going to be reviewed.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'For example, with the review post of ' },
      { text: 'Top 10 laptops for millenniums', italic: true },
      {
        text:
          ',  you can group products to AFFORDABLE, HIGH-END and BEST OVERAL as below:',
      },
    ],
  },
  {
    type: 'tabs',
    items: [
      { title: 'Affordable' },
      { title: 'High-end' },
      { title: 'Best Overal' },
    ],
    children: [
      {
        type: 'tab-panel',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text:
                  'Add Product List Snippet to Tab Content to help readers quickly grasp what info they are going to read about.',
              },
            ],
          },
          {
            type: 'galleries',
            items: [
              {
                id: 1,
                caption: 'Laptop 01',
                src: 'https://source.unsplash.com/400x225/?laptop,work',
              },
              {
                id: 2,
                caption: 'Laptop 02',
                src: 'https://source.unsplash.com/400x225/?pc',
              },
              {
                id: 3,
                caption: 'Laptop 03',
                src: 'https://source.unsplash.com/400x225/?laptop',
              },
              {
                id: 4,
                caption: 'Laptop 04',
                src: 'https://source.unsplash.com/400x225/?work',
              },
            ],
            children: [{ text: '' }],
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
                text:
                  'Add Product List Snippet to Tab Content to help readers quickly grasp what info they are going to read about.',
              },
            ],
          },
          {
            type: 'galleries',
            items: [
              {
                id: 1,
                caption: 'Laptop 05',
                src: 'https://source.unsplash.com/400x225/?laptop,work',
              },
              {
                id: 2,
                caption: 'Laptop 06',
                src: 'https://source.unsplash.com/400x225/?pc',
              },
              {
                id: 3,
                caption: 'Laptop 07',
                src: 'https://source.unsplash.com/400x225/?laptop',
              },
              {
                id: 4,
                caption: 'Laptop 08',
                src: 'https://source.unsplash.com/400x225/?work',
              },
            ],
            children: [{ text: '' }],
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
                text:
                  'Add Product List Snippet to Tab Content to help readers quickly grasp what info they are going to read about.',
              },
            ],
          },
          {
            type: 'galleries',
            items: [
              {
                id: 1,
                caption: 'Laptop 01',
                src: 'https://source.unsplash.com/400x225/?laptop,work',
              },
              {
                id: 2,
                caption: 'Laptop 02',
                src: 'https://source.unsplash.com/400x225/?pc',
              },
              {
                id: 3,
                caption: 'Laptop 03',
                src: 'https://source.unsplash.com/400x225/?laptop',
              },
              {
                id: 4,
                caption: 'Laptop 04',
                src: 'https://source.unsplash.com/400x225/?work',
              },
            ],
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Tab with Content can be inserted to content by using the shortcode: [[tabs]]',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'To learn more about how to declare Tab with Content data, click here.',
      },
    ],
  },
  { type: 'heading-three', children: [{ text: '4. FAQs Accordions' }] },
  {
    type: 'heading-three',
    children: [{ text: '5. The Pros vs Cons Comparison' }],
  },
  { type: 'heading-three', children: [{ text: '6. Product Snippet' }] },
  { type: 'heading-three', children: [{ text: '7. Review Box' }] },
  { type: 'heading-three', children: [{ text: '8. Opt-in Box' }] },
  { type: 'heading-three', children: [{ text: '9. Columns' }] },
  { type: 'heading-three', children: [{ text: '10. Table' }] },
  { type: 'heading-three', children: [{ text: '11. Reference Box' }] },
  { type: 'heading-three', children: [{ text: '12. Video Snippet' }] },
  { type: 'heading-three', children: [{ text: '13. Pinterest Pin Snippet' }] },
  { type: 'heading-three', children: [{ text: '14. Instagram Snippet\n\n' }] },
]
