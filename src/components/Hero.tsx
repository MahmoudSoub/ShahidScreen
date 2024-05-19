import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IconButton from './IconButton';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export const Hero = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const descriptionText =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique animi! Exercitationem, provident?... ';

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const onContainerPress = () => {
    if (isShowMore) {
      toggleShowMore();
    }
  };

  const navigation: any = useNavigation();
  const ImageInfo = [
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
      onPress: () => {},
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

  return (
    <Pressable onPress={onContainerPress} style={styles.container}>
      <>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: -1,
            height: 260,
            width: '100%',
          }}
        />
        <View style={styles.heroContainer}>
          <View style={styles.imageAndText}>
            <Image
              source={require('../assets/breaking-bad-logo.png')}
              style={styles.logoImage}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Breaking Bad</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <ScrollView>
                <Pressable onPress={toggleShowMore}>
                  <Text style={styles.description}>
                    {isShowMore
                      ? descriptionText
                      : `${descriptionText.slice(0, 120)}...`}
                    <Text style={styles.showText}>
                      {isShowMore ? 'Show Less' : ' Show More'}
                    </Text>
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
          <View style={styles.icons}>
            {ImageInfo.map(({id, source, text, onPress}) => (
              <View key={id} style={{}}>
                <IconButton onPress={onPress}>
                  <Image
                    source={source}
                    tintColor={'white'}
                    style={styles.imageIcon}
                  />
                </IconButton>
                {text ? <Text style={styles.text}>{text}</Text> : null}
              </View>
            ))}
          </View>
        </View>
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    width: 100,
    height: 60,
  },
  heroContainer: {
    zIndex: 1,
    width: '100%',
    paddingBottom: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  icons: {
    // backgroundColor: 'green',
    gap: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
  },
  titleContainer: {},
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
  },
  descriptionContainer: {
    maxWidth: 300,
    height: 80,
  },
  description: {
    color: '#f0f0f0',
    fontSize: 12,
  },
  imageAndText: {
    gap: 12,
  },
  imageIcon: {
    height: 24,
    width: 24,
  },
  showButton: {
    color: '#00cc99',
    display: 'flex',
  },
  showText: {
    color: '#00cc99',
    fontWeight: 'bold',
  },
});
