import React from 'react';
import {gql} from 'apollo-boost';
import styled, {ThemeProvider} from 'styled-components';

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import MainRouter from "./Router";
import Footer from "./Footer";
import {useQuery} from "react-apollo-hooks";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const QUERY = gql`
    {
      isLoggedIn @client
    }
  `;

  const {data: {isLoggedIn}} = useQuery(QUERY);
  return (
      <ThemeProvider theme={Theme}>
        <Wrapper>
          <GlobalStyles/>
          <MainRouter isLoggedIn={isLoggedIn}/>
          <Footer />
        </Wrapper>
      </ThemeProvider>
    )
}
