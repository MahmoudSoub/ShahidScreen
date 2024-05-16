import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feed from '../components/Feed';

function HomeScreen() {
  return (
    <>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.gradient}
      />
      <Feed />
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 4,
    height: 64,
    width: '100%',
  },
});
