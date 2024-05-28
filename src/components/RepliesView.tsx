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
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Image source={imageSource} style={{height: 30, width: 30}} />
        <View
          style={[
            styles.comment,
            {
              marginLeft: 10,
              backgroundColor: Colors.secondaryBackground,
            },
          ]}>
          <View style={styles.nameAndTimeAndIcon}>
            <View style={styles.nameAndTime}>
              <Text style={styles.commentNameAndTime}>{`${name} • `}</Text>
              <Text style={styles.commentNameAndTime}>{time}</Text>
            </View>
            <Image
              source={require('../assets/more.png')}
              style={{height: 15, width: 15, margin: 2}}
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
          <View style={{flexDirection: 'row', marginBottom: 10}} key={reply.id}>
            <Image source={reply.imageSource} style={{height: 30, width: 30}} />
            <View
              style={[
                styles.comment,
                {
                  marginLeft: 10,
                  backgroundColor: Colors.secondaryBackground,
                },
              ]}>
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
                  style={{height: 15, width: 15, margin: 2}}
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
  }
  return (
    <Pressable onPress={handleViewRepliesPress}>
      <Text style={{color: Colors.white}}>
        ⎯ View {comment.replies.length} replies
      </Text>
    </Pressable>
  );
};

export default RepliesView;

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  comment: {
    flex: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: Colors.commentBg,
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
  moreIcon: {
    height: 20,
    width: 20,
    margin: 5,
  },
  nameAndTime: {
    paddingTop: 5,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  commentTextContainer: {
    padding: 10,
  },
  commentAndReply: {
    flex: 1,
  },
  reply: {
    color: Colors.textOffWhite,
    padding: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.secondaryBackground,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryBackground,
    justifyContent: 'space-between',
    borderRadius: 50,
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.white,
  },
  sendImage: {
    height: 30,
    width: 30,
  },
  replies: {
    // paddingBottom: 5,
  },
});
