import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

interface DetailsHeaderProps {
  handleBackPress: () => void;
}

function DetailsHeader({handleBackPress}: DetailsHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleBackPress} hitSlop={styles.hitSlop}>
        <Image
          source={require('../assets/arrowleft.png')}
          style={styles.imageIcon}
          tintColor={'white'}
        />
      </Pressable>
      <View>
        <Image
          source={require('../assets/share.png')}
          style={styles.imageIcon}
          tintColor={'white'}
        />
      </View>
    </View>
  );
}

export default DetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageIcon: {
    height: 25,
    width: 25,
  },
  hitSlop: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
});
