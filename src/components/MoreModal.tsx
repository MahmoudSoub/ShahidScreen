import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
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
      propagateSwipe={true}
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
        <View style={styles.shadowView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.episode}>{episode}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable>
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
                        <Image
                          style={styles.imageIcon}
                          source={icon.imageSource}
                        />
                      </ImageBackground>
                    </View>
                    <Text style={styles.iconText}>{icon.text}</Text>
                  </View>
                );
              })}
            </View>
          </Pressable>
        </ScrollView>
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
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    // padding: 20,
    paddingHorizontal: 0,
  },
  linearGradient: {
    height: 1,
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  episode: {
    fontSize: 16,
    color: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    backgroundColor: Colors.primaryBackground,
  },
  description: {
    color: Colors.textOffWhite,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  seprator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.seprator,
  },
  iconsContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
