export const mockComments = [
  {
    id: '1',
    name: 'Ahmad',
    time: '5m ago',
    imageSource: require('../assets/avatar1.png'),
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, perferendis!',
    replies: [
      {
        id: '1',
        name: 'Sam',
        time: '4m ago',
        imageSource: require('../assets/avatar2.png'),
        reply: 'Lol',
      },
      {
        id: '2',
        name: 'Jack',
        time: '3m ago',
        imageSource: require('../assets/avatar3.png'),
        reply: 'Bet',
      },
      {
        id: '3',
        name: 'Jack',
        time: '1m ago',
        imageSource: require('../assets/avatar1.png'),
        reply: 'Lets go',
      },
    ],
  },
  {
    id: '2',
    name: 'Mahmoud',
    time: '1hr ago',
    imageSource: require('../assets/avatar2.png'),
    comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    replies: [
      {
        id: '1',
        name: 'Jacob',
        time: '40m ago',
        imageSource: require('../assets/avatar1.png'),
        reply: 'Lmao',
      },
      {
        id: '2',
        name: 'Jacob',
        time: '40m ago',
        imageSource: require('../assets/avatar1.png'),
        reply: 'Lmao',
      },
    ],
  },
  {
    id: '3',
    name: 'John',
    time: '2d ago',
    imageSource: require('../assets/avatar3.png'),
    comment: 'Lorem ipsum dolor',
    replies: [
      {
        id: '1',
        name: 'Jacob',
        time: '40m ago',
        imageSource: require('../assets/avatar1.png'),
        reply: 'Lmao',
      },
    ],
  },
  {
    id: '4',
    name: 'Mark',
    time: '5h ago',
    imageSource: require('../assets/avatar1.png'),
    comment: 'Necessitatibus, perferendis!',
    replies: [],
  },
];
