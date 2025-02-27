import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Comment, Replies} from './CommentsModal';
import Colors from '../constants/Colors';

interface RepliesViewProps {
  comment: Comment;
  isExpanded: boolean | null;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function RepliesView({
  comment,
  isExpanded,
  setIsExpanded,
}: RepliesViewProps) {
  const handleViewRepliesPress = () => {
    setIsExpanded(true);
  };

  if (comment.replies.length === 0) {
    return null;
  }

  if (isExpanded) {
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
}

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
