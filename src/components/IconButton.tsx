import {
  View,
  Pressable,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface IconButtonProps {
  onPress?: () => void;
  iconSource: ImageSourcePropType;
  tintColor: string | undefined;
}

function IconButton({onPress, iconSource, tintColor}: IconButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}>
        <Image
          source={iconSource}
          tintColor={tintColor}
          style={styles.imageIcon}
        />
      </Pressable>
    </View>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 45 / 2,
    height: 45,
    width: 45,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  buttonInnerContainer: {
    backgroundColor: 'rgba(62, 73, 91, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  pressed: {
    opacity: 0.75,
  },
  imageIcon: {
    height: 24,
    width: 24,
  },
});
