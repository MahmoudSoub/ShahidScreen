import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import Video, {VideoRef} from 'react-native-video';
import Slider from '@react-native-community/slider';
import DescriptionView from './DescriptionView';
import {formatProgressTime} from '../util/ProgressTimeFormatter';
import BottomModal from './BottomModal';

interface PostProps {
  item: PostType;
  activePostId: number;
}

export default function Post({item, activePostId}: PostProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [ended, setEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekCurrentTime, setSeekCurrentTime] = useState(0);
  const [showReplayOverlay, setShowReplayOverlay] = useState(false);
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<VideoRef>(null);

  const {height, width} = useWindowDimensions();
  const maxHeroHeight = height - (64 + 60 + 40 + 60 + 10); // right below the header

  const handleVideoEnded = () => {
    setEnded(true);
    setShowReplayOverlay(true);
    if (currentTime?.toFixed(0) === duration?.toFixed(0)) {
    }
  };
  const handleReplayPress = () => {
    setShowReplayOverlay(false);
    setEnded(false);
    videoRef.current?.seek(0);
    setPaused(false);
  };
  // const onContainerPress = () => {
  //   if (isShowMore) {
  //     toggleShowMore();
  //   }
  //   if (isPlaying && !isShowMore) {
  //     setPaused(true);
  //   } else {
  //     if (!isShowMore) {
  //       setPaused(false);
  //     }
  //   }
  // };

  const onContainerPress = () => {
    if (!isShowMore) {
      setPaused(false);
      if (isPlaying) {
        setPaused(true);
      }
    } else {
      toggleShowMore();
    }
  };

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (activePostId !== item.id) {
      setPaused(true);
    }
    if (activePostId === item.id) {
      setPaused(false);
    }
  }, [activePostId, videoRef.current]);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const textHeight = item.description ? 42 : 0;

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
  const navigation: any = useNavigation();
  const ImageInfo = createImageInfo(
    navigation,
    isLiked,
    setIsLiked,
    setModalVisible,
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Pressable onPress={onContainerPress} style={{height, width, flex: 1}}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.topGradient}
      />
      <Video
        onLoad={e => setDuration(e.duration)}
        onProgress={e => {
          setCurrentTime(e.currentTime);
        }}
        onPlaybackStateChanged={e => setIsPlaying(e.isPlaying)}
        onEnd={handleVideoEnded}
        source={{uri: item.videoSource}}
        style={[StyleSheet.absoluteFill]}
        resizeMode="cover"
        ref={videoRef}
        paused={paused}
      />
      {!isSeeking && paused ? (
        <View
          style={{
            display: ended ? 'none' : 'flex',
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <Image
            source={require('../assets/playIcon.png')}
            style={{
              height: 65,
              width: 65,
              tintColor: 'white',
            }}
          />
        </View>
      ) : showReplayOverlay ? (
        <Pressable
          onPress={handleReplayPress}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 999999999999,
          }}>
          <ImageBackground
            source={item.backgroundSource}
            style={[StyleSheet.absoluteFill, styles.thumbnail]}>
            <Image
              source={require('../assets/replay.png')}
              style={{
                height: 65,
                width: 65,
                tintColor: 'white',
              }}
            />
          </ImageBackground>
        </Pressable>
      ) : null}

      <Animated.View style={[styles.overlay, {opacity: animatedOpacity}]} />
      <View
        style={[styles.heroContainer, {display: isSeeking ? 'none' : 'flex'}]}>
        <View style={styles.heroAndIconsContainer}>
          <View style={styles.imageAndText}>
            <Image source={item.logoSource} style={styles.logoImage} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Animated.View style={[styles.descriptionContainer, animatedStyle]}>
              <DescriptionView
                contentHeight={contentHeight}
                isShowMore={isShowMore}
                item={item}
                maxHeroHeight={maxHeroHeight}
                setContentHeight={setContentHeight}
                textHeight={textHeight}
                toggleShowMore={toggleShowMore}
                handleAnimation={handleAnimation}
              />
            </Animated.View>
          </View>
          <View style={styles.icons}>
            {ImageInfo.map(({id, source, text, onPress, tintColor}) => (
              <View key={id} style={{}}>
                <IconButton
                  onPress={onPress}
                  iconSource={source}
                  tintColor={tintColor}
                />
                {text ? <Text style={styles.text}>{text}</Text> : null}
              </View>
            ))}
          </View>
          <BottomModal
            title={item.title}
            episode={item.episode}
            description={item.description}
            isVisible={isModalVisible}
            onClose={toggleModal}
          />
        </View>
      </View>
      <View style={styles.progressContainer}>
        {isSeeking ? (
          <Text style={styles.progressText}>
            {`${formatProgressTime(seekCurrentTime)} / ${formatProgressTime(
              duration,
            )}`}
          </Text>
        ) : null}
        <Slider
          onSlidingStart={() => {
            setIsSeeking(true);
          }}
          thumbImage={{uri: 'thumbImage', scale: 5}}
          onSlidingComplete={val => {
            videoRef.current?.seek(val);
            setPaused(false);
            setIsSeeking(false);
          }}
          onValueChange={val => {
            setPaused(true);
            setSeekCurrentTime(val);
          }}
          value={currentTime}
          style={{width: '100%', height: 40, flex: 1}}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#00cc99"
          maximumTrackTintColor="#808080"
        />
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.bottomGradient}
      />
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
  thumbnail: {
    position: 'absolute',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 100,
    height: 60,
  },
  heroContainer: {
    zIndex: 999,
    width: '100%',
    paddingBottom: 70,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    // backgroundColor: 'green',
  },
  icons: {
    gap: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
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

  imageAndText: {
    gap: 12,
    justifyContent: 'flex-end',
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

  heroAndIconsContainer: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressContainer: {
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    zIndex: 9999999,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  progressText: {
    // backgroundColor: 'green',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 20,
  },
});
