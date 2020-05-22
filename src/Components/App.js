import React from 'react';
import {gql} from 'apollo-boost';
import styled, {ThemeProvider} from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HashRouter as Router} from "react-router-dom";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import MainRouter from "./Router";
import Footer from "./Footer";
import {useQuery} from "react-apollo-hooks";
import Header from "./Header";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
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
        <GlobalStyles/>
        <Router>
          <Header />
          <Wrapper>
            <MainRouter isLoggedIn={isLoggedIn}/>
            <Footer />
          </Wrapper>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </Router>
      </ThemeProvider>
    )
}
