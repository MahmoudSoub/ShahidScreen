import {Image, StyleSheet, View} from 'react-native';

function HomeHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/left-arrow.png')}
        style={[styles.imageIcon, styles.arrowIcon]}
        tintColor={'white'}
      />
      <View style={styles.emojiAndSearch}>
        <Image
          source={require('../assets/search.png')}
          style={[styles.imageIcon, styles.searchIcon]}
          // tintColor={'black'}
        />
        <Image
          source={require('../assets/emoji.png')}
          style={[styles.imageIcon, styles.searchIcon]}
        />
      </View>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 111,
    height: 64,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageIcon: {
    height: 30,
    width: 30,
  },
  arrowIcon: {
    // marginLeft: 11,
  },
  searchIcon: {
    // marginRight: 11,
  },
  emojiAndSearch: {
    flexDirection: 'row',
    gap: 20,
  },
});
