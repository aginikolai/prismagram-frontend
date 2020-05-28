import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useMutation} from "react-apollo-hooks";

import PostPresenter from './PostPresenter';
import useInput from "../../Hooks/useInput";
import {ADD_COMMENT, TOGGLE_LIKE} from "./PostQueries";
import {toast} from "react-toastify";
import {FEED_QUERY} from "../Feed";

const PostContainer = ({id, user, files, likeCount, isLiked, comments, createdAt, caption, location, createdTime}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
  const [addComment] = useMutation(ADD_COMMENT);

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000)
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000)
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = async () => {
    if (isLikedState === true) {
      setIsLikedState(false);
      setLikeCountState(likeCountState - 1)
    } else {
      setIsLikedState(true);
      setLikeCountState(likeCountState + 1)
    }
    try {
      await toggleLikeMutation({variables: {postId: id}})
    } catch (e) {
      setIsLikedState(isLikedState);
      toast.error(e.message)
    }
  };

  const onKeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      comment.setValue('');
      await addComment({refetchQueries: [{query: FEED_QUERY}], variables: {text: comment.value, postId: id}});
    }
    return;
  };

  const comment = useInput('');

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      comments={comments}
      createdAt={createdAt}
      createdTime={createdTime}
      newComment={comment}
      setIsLieked={setIsLikedState}
      setLikeCount={setLikeCountState}
      location={location}
      caption={caption}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
    />
  )
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    userName: PropTypes.string
  }),
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string
  })),
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      userName: PropTypes.string
    })
  })),
  createdAt: PropTypes.string,
  caption: PropTypes.string,
  location: PropTypes.string
};

export default PostContainer;