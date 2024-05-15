import {ReactNode} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

interface IconButtonProps {
  children: ReactNode;
  onPress?: () => void;
}

function IconButton({children, onPress}: IconButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}>
        {children}
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
    backgroundColor: 'rgba(62, 73, 91, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  pressed: {
    opacity: 0.75,
  },
});
