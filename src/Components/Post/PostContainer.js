import React, {useState} from 'react';
import PropTypes from 'prop-types';

import PostPresenter from './PostPresenter';
import useInput from "../../Hooks/useInput";

const PostContainer = ({id, user, files, likeCount, isLiked, comments, createdAt, caption, location}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const comment = useInput('');
  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLieked={setIsLikedState}
      setLikeCount={setLikeCountState}
      location={location}
      caption={caption}
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