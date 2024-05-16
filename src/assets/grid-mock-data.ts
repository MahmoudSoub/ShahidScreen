import {ImageSourcePropType} from 'react-native';

export interface gridImagesType {
  id: string;
  imageSource: ImageSourcePropType;
  iconSource: ImageSourcePropType;
  viewCount: number;
}

export const gridImages: gridImagesType[] = [
  {
    id: '1',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 32500,
  },
  {
    id: '2',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 15332300,
  },
  {
    id: '3',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 1100000000,
  },
  {
    id: '4',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 14300,
  },
  {
    id: '5',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 300,
  },
  {
    id: '6',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 2500,
  },
  {
    id: '7',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 320,
  },
  {
    id: '8',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 3500,
  },
  {
    id: '9',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 920,
  },
  {
    id: '99',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 320,
  },
  {
    id: '8000',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 3500,
  },
  {
    id: '987899',
    imageSource: require('../assets/gridImage.jpg'),
    iconSource: require('../assets/playIcon.png'),
    viewCount: 920,
  },
];
