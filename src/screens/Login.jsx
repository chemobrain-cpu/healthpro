import React, { useState } from 'react';
import styles from './Signup.module.css';
import avatar from '../assets/health awareness1.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFun } from '../store/action/appStorage';
import AuthModal from '../Modal/AuthModal';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authInfo, setAuthInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    const text = e.target.value;
    setUsername(text);
    setIsDisabled(text.trim() === '' || password.trim() === '');
  };

  const handlePasswordChange = (e) => {
    const text = e.target.value;
    setPassword(text);
    setIsDisabled(text.trim() === '' || username.trim() === '');
  };

  const updateAuthError = () => {
    setIsAuthError(false);
    setAuthInfo('');
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (isLoading || !username || !password) return;

    setIsLoading(true);

   
    const res = await dispatch(loginFun({ username, password }));

    if (!res.bool) {
      setIsLoading(false);
      setIsAuthError(true);
      setAuthInfo(res.message);
      return;
    }

    setIsLoading(false);
    navigate(`/${res.url}`, { state: { username } });
  };

  return (
    <>
      {isAuthError && (
        <AuthModal
          modalVisible={isAuthError}
          updateVisibility={updateAuthError}
          message={authInfo}
        />
      )}

      <div className={styles.screen}>
        <div className={styles.container}>
          <h1 className={styles.title}>Login</h1>

          <div className={styles.avatarWrapper}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
          </div>

          <form className={styles.form} onSubmit={loginHandler}>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={username}
              onChange={handleUsernameChange}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={handlePasswordChange}
              required
            />

            <button
              type="submit"
              className={`${styles.registerBtn} ${isDisabled ? styles.disabledButton : ''}`}
              disabled={isDisabled}
            >
              {isLoading ? (
                <Spinner
                  size={10}
                  color="#fff"
                  className={styles.loader}
                  style={{ color: '#fff', fill: '#fff', stroke: '#fff' }}
                />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;







