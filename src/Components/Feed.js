import React from 'react';
import styled from 'styled-components'
import {gql} from 'apollo-boost';
import {useQuery} from "react-apollo-hooks";
import {Helmet} from 'react-helmet';

import Loader from "./Loader";
import Post from "../Components/Post/index";

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        avatar
        id
        userName
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      createdAt
      createdTime
      comments {
        id
        text
        user {
          id
          userName
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
`;

export default () => {
  const {data, loading} = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <Wrapper>
      <Helmet><title>Feed | Prismagram</title></Helmet>
      {loading && <Loader />}
      {!loading && data && data.seeFeed && data.seeFeed.map(post =>
        <Post
          key={post.id}
          id={post.id}
          user={post.user}
          files={post.files}
          likeCount={post.likeCount}
          isLiked={post.isLiked}
          comments={post.comments}
          createdAt={post.createdAt}
          location={post.location}
          caption={post.caption}
          createdTime={post.createdTime}
        />
      )}
    </Wrapper>
  );
}