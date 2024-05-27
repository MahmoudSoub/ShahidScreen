import {ImageSourcePropType, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';

interface ModalIconProps {
  iconSource: ImageSourcePropType;
}

const ModalIcon = ({iconSource}: ModalIconProps) => {
  return (
    <View>
      <Image source={iconSource} />
      <Text>Seasons1:Episode1</Text>
    </View>
  );
};

export default ModalIcon;
