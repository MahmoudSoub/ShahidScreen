import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import HomeHeader from './HomeHeader';
import {PostType, posts} from '../assets/posts-mock-data';
import Post from './Post';

function Feed() {
  const [activePostId, setActivePostId] = useState(posts[0].id);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken<PostType>[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
    [],
  );

  const renderListItem = ({item}: {item: PostType}) => {
    return <Post item={item} activePostId={activePostId} />;
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <HomeHeader />
        <FlatList
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          keyExtractor={({id}) => id.toString()}
          data={posts}
          renderItem={renderListItem}
        />
      </View>
    </View>
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
});
