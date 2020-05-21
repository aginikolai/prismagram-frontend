import React, {useState} from 'react';
import {useMutation} from 'react-apollo-hooks';

import useInput from "../../Hooks/useInput";
import AuthPresender from './AuthPresender';
import {CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN} from "./AuthQueries";
import {toast} from "react-toastify";

export default () => {
  const [action, setAction] = useState('logIn');
  const userName = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecret] = useMutation(LOG_IN);
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [confirmSecret] = useMutation(CONFIRM_SECRET);
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          await requestSecret({
            update: (_, {data}) =>{
              const {requestSecret} = data;
              if (!requestSecret) {
                toast.error('You dont have a account');
                setTimeout(() => setAction('signUp'), 3000)
              } else {
                toast.success('Check your mailbox');
                setAction('confirm');
              }
            },
            variables: {email: email.value}
          });
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('Email is required');
      }
    } else if (action === 'signUp'){
      if (email.value !== '' && userName.value !== '') {
        try {
          await createAccount({
            variables: {userName: userName.value, email: email.value, firstName: firstName.value, lastName: lastName.value}
          });
          toast.success('Account created, now logIn!')
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('All fields are required!');
      }
    } else if (action === 'confirm') {
      if (secret.value !== "") {
        try {
          const { data } = await confirmSecret({
            variables: {secret: secret.value, email: email.value}
          });
          if (data.confirmSecret !== undefined) {
            await localLogInMutation({
              variables: {token: data.confirmSecret}
            })
          } else {
            throw Error()
          }
        } catch {
          toast.error("Can't confirm secret")
        }
      }
    }
  };

  return <AuthPresender
    setAction={setAction}
    action={action}
    userName={userName}
    password={password}
    firstName={firstName}
    lastName={lastName}
    email={email}
    secret={secret}
    onSubmit={onSubmit}
  />
}