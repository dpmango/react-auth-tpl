import React, { useRef, useEffect, useState, useContext, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import cns from 'classnames';

import { AuthStoreContext } from '@store/AuthStore';
import { Button, Input } from '@ui';
import routes from '@config/routes';

import styles from './Login.module.scss';

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const authContext = useContext(AuthStoreContext);

  const emailRef = useRef(null);

  const handleEmailChange = useCallback(
    (val) => {
      setEmail(val);
    },
    [setEmail]
  );

  const handlePasswordChange = useCallback(
    (val) => {
      setPassword(val);
    },
    [setPassword]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      authContext
        .auth({ email, password })
        .then((res) => {
          console.log(res);
          history.push(routes.HOME);
        })
        .catch((_error) => {
          setError(_error);
        });
    },
    [email, password]
  );

  useEffect(() => {
    // Focus input element
    emailRef.current.focus();
  }, []);

  return (
    <div className="auth mt-2 mb-2">
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.title}>Log in</div>

        {error && <div className={styles.error}>{error}</div>}

        <Input
          label="Email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          inputRef={emailRef}
        />

        <Input
          className="mt-1"
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <Button block className="mt-2" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default memo(Login);
