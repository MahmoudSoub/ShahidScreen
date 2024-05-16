import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HomeHeader from './HomeHeader';
import {PostType, posts} from '../assets/posts-mock-data';
import Post from './Post';

function Feed() {
  const renderListItem = ({item}: {item: PostType}) => {
    return <Post item={item} />;
  };

  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <>
            <HomeHeader />
            <FlatList
              showsVerticalScrollIndicator={false}
              pagingEnabled
              keyExtractor={({id}) => id.toString()}
              data={posts}
              renderItem={renderListItem}
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
    zIndex: -99,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  logoImage: {
    width: 100,
    height: 60,
  },
  heroContainer: {
    zIndex: 999,
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
    maxHeight: 550,
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
