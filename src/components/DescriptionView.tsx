import {
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  View,
  LayoutChangeEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PostType} from '../assets/posts-mock-data';
import Animated, {
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface DescriptionViewProps {
  item: PostType;
  isShowMore: boolean;
  toggleShowMore: () => void;
  handleOpacityAnimation: () => void;
  maxHeroHeight: number;
}

const DescriptionView = ({
  item,
  isShowMore,
  toggleShowMore,
  handleOpacityAnimation,
  maxHeroHeight,
}: DescriptionViewProps) => {
  const [textHeight, setTextHeight] = useState<number>(0);
  const animatedHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const height = isShowMore
      ? Math.min(textHeight, maxHeroHeight)
      : textHeight;
    return {
      height: withTiming(height, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const handleHeightAnimation = () => {
    animatedHeight.value = withTiming(isShowMore ? maxHeroHeight : textHeight, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handleOnLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    setTextHeight(height);
  };

  useEffect(() => {
    handleOpacityAnimation();
    handleHeightAnimation();
  }, [isShowMore]);

  if (!item.description) {
    return null;
  }
  return (
    <Animated.View style={[styles.descriptionContainer, animatedStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={toggleShowMore}>
          <Text style={styles.description} onLayout={e => handleOnLayout(e)}>
            {isShowMore
              ? `${item.description}.. `
              : `${item.description.slice(0, 80)}... `}
            <Text style={styles.showText}>
              {isShowMore ? 'Show Less' : 'Show More'}
            </Text>
          </Text>
        </Pressable>
      </ScrollView>
    </Animated.View>
  );
};

export default DescriptionView;

const styles = StyleSheet.create({
  descriptionContainer: {
    maxWidth: 300,
  },
  description: {
    flex: 1,
    color: '#f0f0f0',
    fontSize: 12,
  },
  showText: {
    color: '#00cc99',
    fontWeight: 'bold',
  },
});
