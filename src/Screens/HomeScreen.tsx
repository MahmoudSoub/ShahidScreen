import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../components/HomeHeader';
import {Hero} from '../components/Hero';

function HomeScreen() {
  return (
    <>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 555,
          height: 64,
          width: '100%',
        }}
      />
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/breakingbad.jpeg')}
          resizeMode="cover"
          style={styles.imageBackground}>
          <View style={styles.innerContainer}>
            <HomeHeader />
            <Hero />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBackground: {
    zIndex: 1,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  image: {
    width: 100,
    height: 60,
  },
  heroContainer: {
    zIndex: 5,
    width: '90%',
    paddingBottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  icons: {
    gap: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
  },
});
