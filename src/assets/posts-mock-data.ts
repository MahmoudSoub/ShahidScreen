import {ImageSourcePropType} from 'react-native';

export interface PostType {
  id: number;
  backgroundSource: ImageSourcePropType;
  videoSource: string;
  title: string;
  logoSource: ImageSourcePropType;
  description: string;
}

export const posts: PostType[] = [
  {
    id: 1,
    backgroundSource: require('../assets/breakingbad.jpeg'),
    videoSource:
      'https://videos.pexels.com/video-files/5512609/5512609-hd_1080_1920_25fps.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.',
  },
  {
    id: 2,
    backgroundSource: require('../assets/breakingbad2.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.',
  },
  {
    id: 3,
    backgroundSource: require('../assets/breakingbad3.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.',
  },
  {
    id: 4,
    backgroundSource: require('../assets/breakingbad4.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.',
  },
  {
    id: 5,
    backgroundSource: require('../assets/breakingbad5.jpeg'),
    videoSource:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
    title: 'Breaking Bad',
    logoSource: require('../assets/breaking-bad-logo.png'),
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit Ut temporibussit amet consectetur adipisicing elit.',
  },
];
