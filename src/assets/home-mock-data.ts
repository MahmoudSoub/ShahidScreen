import {ImageSourcePropType} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Dispatch} from 'react';

export interface ImageInfoItem {
  id: number;
  source: ImageSourcePropType;
  tintColor?: string | undefined;
  text: number | null | string;
  onPress: () => void;
}

const createImageInfo = (
  navigation: NavigationProp<any, any>,
  isLiked: boolean,
  setIsLiked: Dispatch<React.SetStateAction<boolean>>,
  setMoreModalVisible: Dispatch<React.SetStateAction<boolean>>,
  setIsCommentsModalVisible: Dispatch<React.SetStateAction<boolean>>,
  commentsLength: number | null,
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
    text: commentsLength,
    onPress: () => {
      setIsCommentsModalVisible(true);
    },
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
    onPress: () => {
      setMoreModalVisible(true);
    },
  },
];

export default createImageInfo;
