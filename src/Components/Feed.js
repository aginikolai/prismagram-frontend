import React from 'react';
import styled from 'styled-components'
import {gql} from 'apollo-boost';
import {useQuery} from "react-apollo-hooks";

import Loader from "./Loader";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
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
      {loading && <Loader />}
    </Wrapper>
  );
}