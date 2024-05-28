import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Comment, Replies} from './CommentsModal';
import Colors from '../constants/Colors';

const RepliesView = ({comment}: {comment: Comment}) => {
  const [isViewReplies, setIsViewReplies] = useState(false);

  const handleViewRepliesPress = () => {
    setIsViewReplies(true);
  };
  if (comment.replies.length === 0) {
    return null;
  }
  if (comment.replies.length === 1) {
    const {name, time, reply, imageSource} = comment.replies[0];
    return (
      <View style={styles.commentContainer}>
        <Image source={imageSource} style={styles.avatarImage} />
        <View style={styles.comment}>
          <View style={styles.nameAndTimeAndIcon}>
            <View style={styles.nameAndTime}>
              <Text style={styles.commentNameAndTime}>{`${name} • `}</Text>
              <Text style={styles.commentNameAndTime}>{time}</Text>
            </View>
            <Image
              source={require('../assets/more.png')}
              style={styles.moreImage}
              tintColor={Colors.textOffWhite}
            />
          </View>
          <View style={styles.commentTextContainer}>
            <Text style={styles.commentText}>{reply}</Text>
          </View>
        </View>
      </View>
    );
  }
  if (isViewReplies) {
    return (
      <View>
        {comment.replies.map((reply: Replies) => (
          <View style={styles.commentContainer} key={reply.id}>
            <Image source={reply.imageSource} style={styles.avatarImage} />
            <View style={styles.comment}>
              <View style={styles.nameAndTimeAndIcon}>
                <View style={styles.nameAndTime}>
                  <Text
                    style={
                      styles.commentNameAndTime
                    }>{`${reply.name} • `}</Text>
                  <Text style={styles.commentNameAndTime}>{reply.time}</Text>
                </View>
                <Image
                  source={require('../assets/more.png')}
                  style={styles.moreImage}
                  tintColor={Colors.textOffWhite}
                />
              </View>
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>{reply.reply}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <Pressable onPress={handleViewRepliesPress}>
        <Text style={styles.viewRepliesText}>
          ⎯ View {comment.replies.length} replies
        </Text>
      </Pressable>
    );
  }
};

export default RepliesView;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  comment: {
    flex: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginLeft: 10,
    backgroundColor: Colors.secondaryBackground,
  },
  commentNameAndTime: {
    color: Colors.textOffWhite,
    fontSize: 12,
  },
  commentText: {
    color: Colors.white,
  },
  nameAndTimeAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameAndTime: {
    paddingTop: 5,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  commentTextContainer: {
    padding: 10,
  },
  moreImage: {
    height: 15,
    width: 15,
    margin: 5,
  },
  viewRepliesText: {
    color: Colors.textOffWhite,
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarImage: {
    height: 30,
    width: 30,
  },
});
