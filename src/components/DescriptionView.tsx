import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {PostType} from '../assets/posts-mock-data';

interface DescriptionViewProps {
  item: PostType;
  isShowMore: boolean;
  toggleShowMore: () => void;
  maxHeroHeight: number;
  descriptionTextHeight: number;
  contentHeight: number;
  setContentHeight: (height: number) => void;
  handleAnimation: () => void;
}

const DescriptionView = ({
  item,
  isShowMore,
  toggleShowMore,
  maxHeroHeight,
  descriptionTextHeight,
  contentHeight,
  setContentHeight,
  handleAnimation,
}: DescriptionViewProps) => {
  const onTextLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  const animatedDescriptionHeight = useSharedValue(descriptionTextHeight);

  useEffect(() => {
    animatedDescriptionHeight.value = isShowMore
      ? Math.min(contentHeight, maxHeroHeight)
      : descriptionTextHeight;
    handleAnimation();
  }, [isShowMore, contentHeight]);

  if (!item.description) {
    return null;
  }
  if (item.description.length >= 120) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={toggleShowMore}>
          <Text
            style={styles.description}
            onLayout={isShowMore ? onTextLayout : undefined}>
            {isShowMore
              ? item.description
              : `${item.description.slice(0, 121)}...`}
            <Text style={styles.showText}>
              {isShowMore ? ' Show Less' : ' Show More'}
            </Text>
          </Text>
        </Pressable>
      </ScrollView>
    );
  } else {
    return <Text style={styles.description}>{item.description}</Text>;
  }
};

export default DescriptionView;

const styles = StyleSheet.create({
  description: {
    color: '#f0f0f0',
    fontSize: 12,
  },
  showText: {
    color: '#00cc99',
    fontWeight: 'bold',
  },
});
