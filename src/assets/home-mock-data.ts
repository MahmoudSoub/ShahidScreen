import {ImageSourcePropType} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Dispatch} from 'react';

export interface ImageInfoItem {
  id: number;
  source: ImageSourcePropType;
  tintColor?: string | undefined;
  text: string;
  onPress: () => void;
}

const createImageInfo = (
  navigation: NavigationProp<any, any>,
  isLiked: boolean,
  setIsLiked: Dispatch<React.SetStateAction<boolean>>,
): ImageInfoItem[] => [
  {
    id: 1,
    source: require('../assets/info.png'),
    text: 'More Info',
    onPress: () => {
      navigation.navigate('Details');
    },
  },
  {
    id: 2,
    source: require('../assets/like.png'),
    tintColor: isLiked ? 'green' : undefined,
    text: '153',
    onPress: () => {
      setIsLiked(!isLiked);
    },
  },
  {
    id: 3,
    source: require('../assets/chat.png'),
    text: '25',
    onPress: () => {},
  },
  {
    id: 4,
    source: require('../assets/share.png'),
    text: 'Share',
    onPress: () => {},
  },
  {
    id: 5,
    source: require('../assets/more.png'),
    text: '',
    onPress: () => {},
  },
];

export default createImageInfo;
