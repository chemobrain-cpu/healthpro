import React, { useState } from 'react';
import styles from './SignUp.module.css';
import avatar from '../assets/health awareness1.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthModal from '../Modal/AuthModal';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';
import { signupFun } from '../store/action/appStorage'; // You should have a corresponding action

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    age: '',
    school: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authInfo, setAuthInfo] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const allFilled = Object.values(updatedForm).every(val => val.trim() !== '');
    setIsDisabled(!allFilled);
  };

  const updateAuthError = () => {
    setIsAuthError(false);
    setAuthInfo('');
  };

  const buttonHandler = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const res = await dispatch(signupFun(form)); 

    if (!res.bool) {
      setIsLoading(false);
      setIsAuthError(true);
      alert(res.message)
      setAuthInfo(res.message);
      return;
    }

    setIsLoading(false);
    navigate(`/${res.url}`, { state: { username: form.username } });
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
          <h1 className={styles.title}>Sign Up</h1>

          <div className={styles.avatarWrapper}>
            <img src={avatar} alt="Profile Avatar" className={styles.avatar} />
          </div>

          <form className={styles.form} onSubmit={buttonHandler}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className={styles.input}
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              placeholder="Age"
              name="age"
              className={styles.input}
              value={form.age}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="School"
              name="school"
              className={styles.input}
              value={form.school}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              className={styles.input}
              value={form.password}
              onChange={handleChange}
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
                'Register'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;



