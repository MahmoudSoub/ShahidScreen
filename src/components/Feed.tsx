import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import IconButton from './IconButton';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from './HomeHeader';
import {useNavigation} from '@react-navigation/native';
import createImageInfo from '../assets/home-mock-data';
import {posts} from '../assets/posts-mock-data';

function Feed() {
  const [isShowMore, setIsShowMore] = useState(false);
  const {id, backgroundSource, title, logoSource} = posts[0];
  const descriptionText =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus veritatis reprehenderit quo, amet facere. Quae in cupiditate quos? Doloremque facere delectus atque nostrum molestias sequi similique animi! Exercitationem, provident?... ';

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const onContainerPress = () => {
    if (isShowMore) {
      toggleShowMore();
    }
  };
  const {height, width} = useWindowDimensions();
  const navigation: any = useNavigation();
  const ImageInfo = createImageInfo(navigation);
  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 1,
                height: 260,
                width: '100%',
              }}
            />
            <HomeHeader />
            <FlatList
              // contentContainerStyle={{backgroundColor: 'red'}}
              pagingEnabled
              keyExtractor={({id}) => id.toString()}
              data={posts}
              renderItem={({item}) => (
                <Pressable onPress={onContainerPress} style={{height}}>
                  <ImageBackground
                    source={item.backgroundSource}
                    style={styles.imageBackground}
                    resizeMode="cover">
                    <View style={styles.heroContainer}>
                      <View style={styles.imageAndText}>
                        <Image
                          source={item.logoSource}
                          style={styles.logoImage}
                        />
                        <View style={styles.titleContainer}>
                          <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <ScrollView>
                            <Pressable onPress={toggleShowMore}>
                              <Text style={styles.description}>
                                {isShowMore
                                  ? descriptionText
                                  : `${descriptionText.slice(0, 120)}...`}
                                <Text style={styles.showText}>
                                  {isShowMore ? 'Show Less' : ' Show More'}
                                </Text>
                              </Text>
                            </Pressable>
                          </ScrollView>
                        </View>
                      </View>
                      <View style={styles.icons}>
                        {ImageInfo.map(({id, source, text, onPress}) => (
                          <View key={id} style={{}}>
                            <IconButton onPress={onPress}>
                              <Image
                                source={source}
                                tintColor={'white'}
                                style={styles.imageIcon}
                              />
                            </IconButton>
                            {text ? (
                              <Text style={styles.text}>{text}</Text>
                            ) : null}
                          </View>
                        ))}
                      </View>
                    </View>
                  </ImageBackground>
                </Pressable>
              )}
            />
          </>
        </View>
      </View>
    </>
  );
}

export default Feed;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
  },
  imageBackground: {
    zIndex: 1,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  logoImage: {
    width: 100,
    height: 60,
  },
  heroContainer: {
    zIndex: 1,
    width: '100%',
    paddingBottom: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  icons: {
    // backgroundColor: 'green',
    gap: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
  },
  titleContainer: {},
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
  },
  descriptionContainer: {
    maxWidth: 300,
    maxHeight: 80,
  },
  description: {
    color: '#f0f0f0',
    fontSize: 12,
  },
  imageAndText: {
    gap: 12,
  },
  imageIcon: {
    height: 24,
    width: 24,
  },
  showButton: {
    color: '#00cc99',
    display: 'flex',
  },
  showText: {
    color: '#00cc99',
    fontWeight: 'bold',
  },
});
