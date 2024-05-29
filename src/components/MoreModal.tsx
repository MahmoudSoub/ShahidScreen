import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

interface MoreModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  episode: string;
  description: string;
}

export default function MoreModal({
  isVisible,
  onClose,
  title,
  episode,
  description,
}: MoreModalProps) {
  const {height} = useWindowDimensions();

  const iconsData = [
    {
      id: '1',
      imageSource: require('../assets/playIcon.png'),
      text: 'Season1:Episode1',
    },
    {
      id: '2',
      imageSource: require('../assets/download.png'),
      text: 'Download Episode',
    },
    {
      id: '3',
      imageSource: require('../assets/info.png'),
      text: 'More Info',
    },
    {
      id: '4',
      imageSource: require('../assets/share.png'),
      text: 'Share',
    },
  ];
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00CC99', '#0099FF']}
        style={styles.linearGradient}
      />
      <View style={[styles.modalContent, {maxHeight: height * 0.8}]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.episode}>{episode}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.seprator} />
        <View>
          {iconsData.map(icon => {
            return (
              <View style={styles.iconsContainer} key={icon.id}>
                <View style={styles.iconAndTextContainer}>
                  <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../assets/modalIcon.png')}>
                    <Image style={styles.imageIcon} source={icon.imageSource} />
                  </ImageBackground>
                </View>
                <Text style={styles.iconText}>{icon.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.primaryBackground,
    padding: 20,
  },
  linearGradient: {
    height: 1,
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  episode: {
    fontSize: 16,
    color: Colors.white,
    paddingVertical: 10,
  },
  description: {
    color: Colors.textOffWhite,
    fontSize: 16,
    paddingBottom: 20,
  },
  seprator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.seprator,
  },
  iconsContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: {
    height: 20,
    width: 20,
  },
  iconText: {
    color: Colors.white,
  },
  backgroundImage: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconAndTextContainer: {
    paddingVertical: 5,
  },
});
