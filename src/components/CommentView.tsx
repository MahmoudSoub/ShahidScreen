import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RepliesView from './RepliesView';
import {Comment} from './CommentsModal';
import Colors from '../constants/Colors';

interface CommentViewProps {
  comment: Comment;
  inputRef: React.RefObject<TextInput>;
  setReplyToCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
}

const CommentView = ({
  comment,
  inputRef,
  setReplyToCommentId,
  setNewComment,
}: CommentViewProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean | null>(null);

  const currentRepliesLength = useRef(comment.replies.length);

  useEffect(() => {
    if (currentRepliesLength.current === 1) {
      setIsExpanded(true);
    }
    if (currentRepliesLength.current !== comment.replies.length) {
      setIsExpanded(true);
    }
  }, [comment.replies.length]);

  const handleReplyPress = (commentId: string, name: string) => {
    setReplyToCommentId(commentId);
    setNewComment(`@${name} `);
    inputRef.current?.focus();
  };
  return (
    <View style={styles.commentContainer}>
      <Image source={comment.imageSource} style={{height: 45, width: 45}} />
      <View style={styles.commentAndReply}>
        <View style={styles.comment}>
          <View style={styles.nameAndTimeAndIcon}>
            <View style={styles.nameAndTime}>
              <Text
                style={styles.commentNameAndTime}>{`${comment.name} • `}</Text>
              <Text style={styles.commentNameAndTime}>{comment.time}</Text>
            </View>
            <Image
              source={require('../assets/more.png')}
              style={styles.moreIcon}
              tintColor={Colors.textOffWhite}
            />
          </View>
          <View style={styles.commentTextContainer}>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
          }}>
          <Pressable
            style={({pressed}) => (pressed ? styles.pressed : null)}
            onPress={() => handleReplyPress(comment.id, comment.name)}>
            <Text style={styles.replyText}>Reply</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => (pressed ? styles.pressed : null)}
            onPress={() => {
              setIsExpanded(false);
            }}>
            <Image
              source={require('../assets/collapse.png')}
              style={{
                height: 20,
                width: 20,
                display: isExpanded ? 'flex' : 'none',
              }}
              tintColor={Colors.textOffWhite}
            />
          </Pressable>
        </View>
        <RepliesView
          comment={comment}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </View>
    </View>
  );
};

export default CommentView;

const styles = StyleSheet.create({
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
    backgroundColor: Colors.secondaryBackground,
  },
  commentNameAndTime: {
    color: Colors.textOffWhite,
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
  replyText: {
    color: Colors.textOffWhite,
    padding: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
