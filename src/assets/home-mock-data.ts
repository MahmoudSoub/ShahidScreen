import {ImageSourcePropType} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

export interface ImageInfoItem {
  id: number;
  source: ImageSourcePropType;
  text: string;
  onPress: () => void;
}

const createImageInfo = (
  navigation: NavigationProp<any, any>,
  isLiked: boolean,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>,
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
