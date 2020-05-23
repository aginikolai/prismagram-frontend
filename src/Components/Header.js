import React from 'react';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';
import {gql} from 'apollo-boost'

import useInput from "../Hooks/useInput";
import Input from "./Input";
import {Compass, HeartEmpty, User, Logo} from "./Icons";
import {useQuery} from "react-apollo-hooks";

const Header = styled.header`
  ${props => props.theme.whiteBox};
  width: 100%;
  border: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child{
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 400;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
  margin-right: 30px;
  }
`;
const ME = gql`
  {
    me {
      user {
        userName
      }
    }
  }
`;

export default withRouter(({history}) =>  {

  const search = useInput("");
  const {data} = useQuery(ME);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`)
  };
  if (!data || !data.me) return <p>Loading...</p>;
  console.log(data.me.user.userName);

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
           <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form action="" onSubmit={onSearchSubmit}>
            <SearchInput {...search} placeholder="Search"/>
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/explore">
            <HeartEmpty />
          </HeaderLink>
          <HeaderLink to={!data.me ? '/#' : `/${data.me.user.userName}`}>
            <User />
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  )
})