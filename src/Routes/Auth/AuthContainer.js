import React, {useState} from 'react';

import useInput from "../../Hooks/useInput";
import AuthPresender from './AuthPresender';

export default () => {
  const [action, setAction] = useState('logIn');
  const userName = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const onLogin = (event) => {
    event.preventDefault()
  };

  return <AuthPresender
    setAction={setAction}
    action={action}
    userName={userName}
    password={password}
    firstName={firstName}
    lastName={lastName}
    email={email}
    onLogin={onLogin}
  />
}