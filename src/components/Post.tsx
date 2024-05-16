import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from './IconButton';
import {useNavigation} from '@react-navigation/native';
import createImageInfo from '../assets/home-mock-data';
import type {PostType} from '../assets/posts-mock-data';

interface PostProps {
  item: PostType;
}

export default function Post({item}: PostProps) {
  const [isShowMore, setIsShowMore] = useState(false);
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const onContainerPress = () => {
    if (isShowMore) {
      toggleShowMore();
    }
  };
  const navigation: any = useNavigation();
  const ImageInfo = createImageInfo(navigation);

  const {height, width} = useWindowDimensions();

  const descriptionText =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis consectetur adipisicing elit. Ut temporibus veritatisconsectetur adipisicing elit. Ut temporibus veritatisconsectetur adipisicing elit. Ut temporibus veritconsectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique animi! Exercitationem, provident?... ';
  const maxHeroHeight = height - (64 + 60 + 40 + 60); // right under the header
  return (
    <Pressable onPress={onContainerPress} style={{height}}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.topGradient}
      />

      <ImageBackground
        source={item.backgroundSource}
        style={styles.imageBackground}
        resizeMode="cover">
        {isShowMore && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 99,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
        )}
        <View style={styles.heroContainer}>
          <View style={styles.imageAndText}>
            <Image source={item.logoSource} style={styles.logoImage} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View
              style={[styles.descriptionContainer, {maxHeight: maxHeroHeight}]}>
              <ScrollView showsVerticalScrollIndicator={false}>
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
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.bottomGradient}
        />
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    height: 100,
    width: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 10,
    height: 260,
    width: '100%',
  },
  imageBackground: {
    zIndex: -99,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  logoImage: {
    width: 100,
    height: 60,
  },
  heroContainer: {
    zIndex: 999,
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
    // maxHeight: 550,
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
