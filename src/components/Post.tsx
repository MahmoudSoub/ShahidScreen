import {
  Image,
  ImageBackground,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from './IconButton';
import {useNavigation} from '@react-navigation/native';
import createImageInfo from '../assets/home-mock-data';
import type {PostType} from '../assets/posts-mock-data';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface PostProps {
  item: PostType;
}

export default function Post({item}: PostProps) {
  const {height} = useWindowDimensions();
  const maxHeroHeight = height - (64 + 60 + 40 + 60 + 10); // right under the header
  const [isLiked, setIsLiked] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const textHeight = item.description ? 42 : 0;
  const animatedHeight = useSharedValue(textHeight);
  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const height = isShowMore
      ? Math.min(contentHeight, maxHeroHeight)
      : textHeight;
    return {
      height: withTiming(height, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const handleAnimation = () => {
    animatedOpacity.value = withTiming(isShowMore ? 0.8 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  };

  useEffect(() => {
    animatedHeight.value = isShowMore
      ? Math.min(contentHeight, maxHeroHeight)
      : textHeight;
    handleAnimation();
  }, [isShowMore, contentHeight]);

  const onTextLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  const onContainerPress = () => {
    if (isShowMore) {
      toggleShowMore();
    }
  };

  const navigation: any = useNavigation();
  const ImageInfo = createImageInfo(navigation, isLiked, setIsLiked);

  const DescriptionView = () => {
    if (!item.description) {
      return null;
    }
    if (item.description.length > 120) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flexGrow: 0}}
          contentContainerStyle={{
            flexGrow: 0,
          }}>
          <Pressable onPress={toggleShowMore}>
            <Text
              style={styles.description}
              onLayout={isShowMore ? onTextLayout : undefined}>
              {isShowMore
                ? item.description
                : `${item.description.slice(0, 120)}...`}
              <Text style={styles.showText}>
                {isShowMore ? ' Show Less' : ' Show More'}
              </Text>
            </Text>
          </Pressable>
        </ScrollView>
      );
    } else {
      return (
        <Text style={styles.description} onLayout={onTextLayout}>
          {item.description}
        </Text>
      );
    }
  };

  return (
    <Pressable onPress={onContainerPress} style={{height, flex: 1}}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.topGradient}
      />

      <ImageBackground
        source={item.backgroundSource}
        style={styles.imageBackground}
        resizeMode="cover">
        <Animated.View style={[styles.overlay, {opacity: animatedOpacity}]} />
        <View style={styles.heroContainer}>
          <View style={styles.imageAndText}>
            <Image source={item.logoSource} style={styles.logoImage} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Animated.View style={[styles.descriptionContainer, animatedStyle]}>
              <DescriptionView />
            </Animated.View>
          </View>
          <View style={styles.icons}>
            {ImageInfo.map(({id, source, text, onPress}) => (
              <View key={id} style={{}}>
                <IconButton onPress={onPress} iconSource={source} />
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
    overflow: 'hidden',
  },
  description: {
    color: '#f0f0f0',
    fontSize: 12,
  },
  imageAndText: {
    gap: 12,
    justifyContent: 'flex-end',
  },

  showText: {
    color: '#00cc99',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});
