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
import Video, {OnLoadData, OnProgressData, VideoRef} from 'react-native-video';
import Slider from '@react-native-community/slider';
import DescriptionView from './DescriptionView';
import {formatProgressTime} from '../util/ProgressTimeFormatter';
import MoreModal from './MoreModal';
import CommentsModal from './CommentsModal';

interface PostProps {
  item: PostType;
  activePostId: number;
}

export default function Post({item, activePostId}: PostProps) {
  const [isMoreModalVisible, setMoreModalVisible] = useState(false);
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [commentsLength, setCommentsLength] = useState<number | null>(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [ended, setEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>();
  const [duration, setDuration] = useState<number>();
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
  };
  const handleReplayPress = () => {
    setShowReplayOverlay(false);
    setEnded(false);
    videoRef.current?.seek(0);
    setPaused(false);
  };

  const onContainerPress = () => {
    if (!isShowMore) {
      setPaused(false);
      if (!paused) {
        setPaused(true);
      }
    } else {
      toggleShowMore();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      setPaused(activePostId !== item.id);
    }
  }, [activePostId, videoRef.current]);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const descriptionTextHeight = item.description ? 42 : 0;

  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const height = isShowMore
      ? Math.min(contentHeight, maxHeroHeight)
      : descriptionTextHeight;
    return {
      height: withTiming(height, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const handleAnimation = () => {
    animatedOpacity.value = withTiming(isShowMore ? 0.8 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  };
  const handleOnLoad = (e: OnLoadData) => {
    setDuration(e.duration);
  };
  const handleOnProgress = (e: OnProgressData) => {
    setCurrentTime(e.currentTime);
  };
  const handleOnSlidingStart = () => {
    setIsSeeking(true);
  };
  const handleOnSlidingComplete = (val: number) => {
    videoRef.current?.seek(val);
    setPaused(false);
    setIsSeeking(false);
  };
  const handleOnValueChange = (val: number) => {
    setPaused(true);
    setSeekCurrentTime(val);
  };
  const navigation: any = useNavigation();
  const imageInfo = createImageInfo(
    navigation,
    isLiked,
    setIsLiked,
    setMoreModalVisible,
    setIsCommentsModalVisible,
    commentsLength,
  );

  const toggleMoreModal = () => {
    setMoreModalVisible(!isMoreModalVisible);
  };
  const toggleCommentsModal = () => {
    setIsCommentsModalVisible(!isCommentsModalVisible);
  };

  return (
    <Pressable onPress={onContainerPress} style={{height, width, flex: 1}}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.topGradient}
      />
      <Video
        onLoad={handleOnLoad}
        onProgress={handleOnProgress}
        onEnd={handleVideoEnded}
        source={{uri: item.videoSource}}
        style={[StyleSheet.absoluteFill]}
        resizeMode="cover"
        ref={videoRef}
        paused={paused}
      />
      {!isSeeking && paused ? (
        <View style={[styles.pauseOverlay, {display: ended ? 'none' : 'flex'}]}>
          <Image
            source={require('../assets/playIcon.png')}
            style={styles.playIcon}
          />
        </View>
      ) : showReplayOverlay ? (
        <Pressable onPress={handleReplayPress} style={styles.replayOverlay}>
          <ImageBackground
            source={item.backgroundSource}
            style={[StyleSheet.absoluteFill, styles.thumbnail]}>
            <Image
              source={require('../assets/replay.png')}
              style={styles.replayImage}
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
                descriptionTextHeight={descriptionTextHeight}
                toggleShowMore={toggleShowMore}
                handleAnimation={handleAnimation}
              />
            </Animated.View>
          </View>
          <View style={styles.icons}>
            {imageInfo.map(({id, source, text, onPress, tintColor}) => (
              <View key={id}>
                <IconButton
                  onPress={onPress}
                  iconSource={source}
                  tintColor={tintColor}
                />
                {text ? <Text style={styles.text}>{text}</Text> : null}
              </View>
            ))}
          </View>
          <MoreModal
            title={item.title}
            episode={item.episode}
            description={item.description}
            isVisible={isMoreModalVisible}
            onClose={toggleMoreModal}
          />
          <CommentsModal
            onCommentLengthChange={length => setCommentsLength(length)}
            isVisible={isCommentsModalVisible}
            onClose={toggleCommentsModal}
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
          onSlidingStart={handleOnSlidingStart}
          thumbImage={{uri: 'thumbImage', scale: 5}}
          onSlidingComplete={handleOnSlidingComplete}
          onValueChange={handleOnValueChange}
          value={currentTime}
          style={styles.slider}
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
    // overflow: 'hidden',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressContainer: {
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
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    flex: 1,
  },
  pauseOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  replayOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 999999999999,
  },
  playIcon: {
    height: 65,
    width: 65,
    tintColor: 'white',
  },
  replayImage: {
    height: 65,
    width: 65,
    tintColor: 'white',
  },
});
