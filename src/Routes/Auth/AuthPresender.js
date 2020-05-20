import React from 'react';
import styled from 'styled-components';

import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  border-radius: 0;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      &:not(:last-child){
        margin-bottom: 7px;
      }
      width: 100%;
    }
    button {
      margin-top: 10px;
    }
  }
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

export default ({action, userName, password, firstName, lastName, email, setAction, onSubmit, secret}) => {
  return (
    <Wrapper>
      <Form>
        {action === 'logIn' &&(
            <form onSubmit={onSubmit}>
              <Input placeholder={"Email"} {...email} type="email"/>
              <Button text={"Log In"} />
            </form>
          )}
        {action === 'signUp' &&(
          <form onSubmit={onSubmit}>
            <Input placeholder={"First name"} {...firstName}/>
            <Input placeholder={"Last Name"} {...lastName}/>
            <Input placeholder={"Email"} {...email} type="email"/>
            <Input placeholder={"Username"} {...userName}/>
            <Button text={"Sign Up"} />
          </form>
        ) }
        {action === 'confirm' && (
          <form onSubmit={onSubmit}>
            <Input placeholder={"Confirm Secret"} required {...secret}/>
            <Button text={"Confirm"}/>
          </form>
        )}
      </Form>
      {action !== 'confirm' && (
        <StateChanger>
          {action === 'logIn'
            ? (
              <>
                Don't have an account?{" "} <Link onClick={() => setAction("signUp")}>Sign up</Link>
              </>
            ) : (
              <>
                Have an account? <Link onClick={() => setAction("logIn")}>Log in</Link>
              </>
            )}
        </StateChanger>
      )}
    </Wrapper>
  )
}