import {Image, StyleSheet, View} from 'react-native';

function HomeHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/arrowleft.png')}
        style={[styles.imageIcon, styles.arrowIcon]}
        tintColor={'black'}
      />
      <View style={styles.emojiAndSearch}>
        <Image
          source={require('../assets/search.png')}
          style={[styles.imageIcon, styles.searchIcon]}
          tintColor={'black'}
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
    flexDirection: 'row',
    width: '90%',
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
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
