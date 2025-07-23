import React from 'react';
import styles from './Onboard.module.css';
import illustration from '../assets/health awareness1.png'; // place the image in the same folder
import { useNavigate } from 'react-router-dom';



const HealthAwareness = () => {
  const navigate = useNavigate()

  const loginHandler = ()=>{
    navigate('/login')
  }


  const signupHandler = ()=>{
    navigate('/signup')

  }
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to<br />HealthPro!</h1>
      <img src={illustration} alt="Health Awareness Illustration" className={styles.image} />

      <p className={styles.tagline}>Learn healthy habits for a better life</p>


      <div className={styles.buttons}>
        <button className={styles.loginBtn} onClick={loginHandler}>Login</button>
        <button className={styles.signupBtn} onClick={signupHandler}>Sign Up</button>
      </div>
    </div>

    </div>
    
  );
};

export default HealthAwareness;




