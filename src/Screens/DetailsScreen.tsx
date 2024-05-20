import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import {gridImages} from '../assets/grid-mock-data';
import type {gridImagesType} from '../assets/grid-mock-data';
import {formatNumber} from '../util/NumberFormatter';

const DetailsScreen = ({navigation}: any) => {
  const [toggleCol, setToggleCol] = useState(false);

  const numOfCol = toggleCol ? 3 : 2;
  const {width} = useWindowDimensions();
  const MarginHorizontal = 2;
  const PaddingHorizontal = 10;
  const horizontalToSubtract = MarginHorizontal * 6 + PaddingHorizontal * 2;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderListHeader = () => {
    return (
      <View style={styles.heroContainer}>
        <Image
          source={require('../assets/breaking-bad-logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui nemo
          sequi, aut repudiandae porro dignissimos voluptatum alias accusamus
          incidunt.
        </Text>

        <Text style={styles.showInfo}>Show Info</Text>
        <Pressable
          style={{position: 'absolute', right: 10, bottom: 0}}
          onPress={() => setToggleCol(!toggleCol)}>
          <Text style={{color: 'white'}}>SWITCH</Text>
        </Pressable>
      </View>
    );
  };

  const handleRenderItem = useCallback(
    ({item}: {item: gridImagesType}) => {
      const imageWidth = (width - horizontalToSubtract) / numOfCol;
      const formattedViews = formatNumber(item.viewCount);
      return (
        <View
          style={{
            marginBottom: 4,
            marginHorizontal: MarginHorizontal,
          }}>
          <Image
            source={item.imageSource}
            style={[styles.gridImage, {width: imageWidth}]}
          />
          <View style={styles.playContainer}>
            <Image
              source={item.iconSource}
              tintColor={'white'}
              style={styles.playIcon}
            />
            <Text style={{color: 'white', fontSize: 12, fontWeight: '700'}}>
              {formattedViews}
            </Text>
          </View>
        </View>
      );
    },
    [toggleCol],
  );

  return (
    <View style={styles.container}>
      <DetailsHeader handleBackPress={handleBackPress} />
      <FlatList
        bounces={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 20,
          backgroundColor: '#181d25',
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        numColumns={numOfCol}
        key={numOfCol}
        data={gridImages}
        renderItem={handleRenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#20252D',
  },
  heroContainer: {
    paddingTop: 10,
    backgroundColor: '#20252D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    resizeMode: 'contain',
    height: 90,
    width: 90,
  },
  description: {
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 30,
  },
  showInfo: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#00cc99',
    fontWeight: '600',
  },

  gridImage: {
    resizeMode: 'cover',
    height: 200,
    borderRadius: 5,
  },
  playContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    height: 15,
    width: 15,
    marginRight: 4,
  },
});
