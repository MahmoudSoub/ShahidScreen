import React, {useCallback} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import DetailsHeader from '../components/DetailsHeader';
import {gridImages} from '../assets/mock-data';
import type {gridImagesType} from '../assets/mock-data';

const DetailsScreen = ({navigation}: any) => {
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
      </View>
    );
  };

  const handleRenderItem = useCallback(({item}: {item: gridImagesType}) => {
    return (
      <View>
        <Image source={item.imageSource} style={styles.gridImage} />
        <View style={styles.playContainer}>
          <Image
            source={item.iconSource}
            tintColor={'white'}
            style={styles.playIcon}
          />
          <Text style={{color: 'white', fontSize: 12, fontWeight: '700'}}>
            {item.viewCount}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <DetailsHeader handleBackPress={handleBackPress} />
      <FlatList
        // style={{backgroundColor: '#181d25'}}
        contentContainerStyle={{
          paddingBottom: 18,
          alignItems: 'center',
          gap: 6,
          backgroundColor: '#181d25',
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        numColumns={3}
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
    marginBottom: 5,
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
    resizeMode: 'contain',
    height: 191,
    width: 100,
    borderRadius: 5,
    marginHorizontal: 3,
    // marginBottom: 4,
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
