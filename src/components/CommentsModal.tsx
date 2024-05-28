import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  ImageRequireSource,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import RepliesView from './RepliesView';
import {mockComments} from '../assets/comments-mock-data';

interface CommentsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  episode: string;
  description: string;
}
export interface Comment {
  id: string;
  name: string;
  time: string;
  imageSource: ImageRequireSource;
  comment: string;
  replies: Replies[];
}
export interface Replies {
  id: string;
  name: string;
  time: string;
  imageSource: ImageRequireSource;
  reply: string;
}

export default function CommentsModal({
  isVisible,
  onClose,
}: CommentsModalProps) {
  const {height} = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const avatars = [
    require('../assets/avatar1.png'),
    require('../assets/avatar2.png'),
    require('../assets/avatar3.png'),
  ];
  const names = ['Ahmad', 'Mahmoud', 'John', 'Mark'];

  //   useEffect(() => {
  //     const keyboardDidHideListener = Keyboard.addListener(
  //       'keyboardDidHide',
  //       () => {
  //         setReplyToCommentId(null);
  //       },
  //     );

  //     return () => {
  //       keyboardDidHideListener.remove();
  //     };
  //   }, []);

  const handleSend = () => {
    console.log({replyToCommentId});

    if (newComment.trim() === '') {
      return;
    }
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    if (replyToCommentId) {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === replyToCommentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: (comment.replies.length + 1).toString(),
                    name: randomName,
                    time: 'Just Now',
                    imageSource: randomAvatar,
                    reply: newComment,
                  },
                ],
              }
            : comment,
        ),
      );
      setReplyToCommentId(null);
    } else {
      const newCommentObj = {
        id: (comments.length + 1).toString(),
        name: randomName,
        time: 'Just now',
        imageSource: randomAvatar,
        comment: newComment,
        replies: [],
      };
      setComments(prevComments => [...prevComments, newCommentObj]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
    setNewComment('');
  };

  const handleReplyPress = (commentId: string, name: string) => {
    setReplyToCommentId(commentId);
    setNewComment(`@${name} `);
    inputRef.current?.focus();
  };

  return (
    <Modal
      avoidKeyboard={true}
      propagateSwipe={true}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}>
      <View style={[styles.modalContent, {maxHeight: height * 0.8}]}>
        <View style={styles.header}>
          <View style={{width: 20, height: 20}} />
          <Text style={styles.title}>{comments.length} Comments</Text>
          <View>
            <Pressable onPress={onClose}>
              <Image
                style={styles.closeImage}
                source={require('../assets/close.png')}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          keyboardShouldPersistTaps={'handled'}
          ref={scrollViewRef}
          bounces={false}
          style={styles.commentsContainer}>
          <Pressable>
            {comments.map(comment => {
              return (
                <View key={comment.id} style={styles.commentContainer}>
                  <Image
                    source={comment.imageSource}
                    style={{height: 45, width: 45}}
                  />
                  <View style={styles.commentAndReply}>
                    <Pressable
                      onPress={() =>
                        handleReplyPress(comment.id, comment.name)
                      }>
                      <View style={styles.comment}>
                        <View style={styles.nameAndTimeAndIcon}>
                          <View style={styles.nameAndTime}>
                            <Text
                              style={
                                styles.commentNameAndTime
                              }>{`${comment.name} • `}</Text>
                            <Text style={styles.commentNameAndTime}>
                              {comment.time}
                            </Text>
                          </View>
                          <Image
                            source={require('../assets/more.png')}
                            style={styles.moreIcon}
                            tintColor={Colors.textOffWhite}
                          />
                        </View>
                        <View style={styles.commentTextContainer}>
                          <Text style={styles.commentText}>
                            {comment.comment}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.reply}>Reply</Text>
                      </View>
                    </Pressable>
                    <RepliesView comment={comment} />
                  </View>
                </View>
              );
            })}
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.textInputContainer}>
            <TextInput
              //   defaultValue="start typing"
              ref={inputRef}
              value={newComment}
              onChangeText={setNewComment}
              placeholder={
                replyToCommentId ? 'Type a reply...' : 'Type a message...'
              }
              placeholderTextColor={Colors.textOffWhite}
              style={styles.textInput}
            />
            <Pressable
              onPress={handleSend}
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
              <Image
                source={require('../assets/send.png')}
                style={styles.sendImage}
              />
            </Pressable>
          </View>
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
    backgroundColor: Colors.modalContentBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.secondaryBackground,
  },
  closeImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
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
    backgroundColor: Colors.secondaryBackground,
  },
  commentNameAndTime: {
    color: Colors.textOffWhite,
  },
  commentText: {
    color: Colors.white,
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
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
});
