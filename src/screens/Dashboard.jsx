import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import {

  FaBars,
  FaUserCircle
} from 'react-icons/fa';
import SideBar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate()
  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [tipIndex, setTipIndex] = useState(0);
  const [clickedCard, setClickedCard] = useState(null);
  const avatarUrl = '';
    let { user} = useSelector(state => state.userAuth)



  const toggleSidebar = () => setSidebarOpen(!isOpen);

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleCardClick = (card) => {
    setClickedCard(card);
  };

  const tips = [
    '🍎 Eat more fruits & veggies!',
    '💧 Drink plenty of water.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  const  handleNavigate = (data)=>{
    navigate(`/${data}`)

  }


  return (
    <div className={styles.containers}>
      {/* Sidebar */}
      <SideBar handleNavClick ={handleNavClick} activePage={activePage} toggleSidebar={toggleSidebar} isOpen = {isOpen}/>


      {/* Main Content */}
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
            <FaBars />
          </div>
          <h2 className={styles.title}>{activePage}</h2>
          {avatarUrl ? (
            <img src={avatarUrl} alt="User avatar" className={styles.avatar} />
          ) : (
            <FaUserCircle className={styles.avatarPlaceholder} />
          )}
        </header>

        <div className={styles.greeting}>
          <h1 className="animatedText">Hi {user?.username} </h1>
        </div>

        <div className={styles.cardGrid}>
          {/* Quiz Score */}
          <div
            className={`${styles.card} ${clickedCard === 'score' ? styles.cardClicked : ''}`}
            onClick={() => handleCardClick('score')}
          >
            <h3>Quiz Score</h3>
            <p>{user?.score}</p>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}></div>
            </div>
          </div>

          {/* Badges */}
          <div
            className={`${styles.card} ${clickedCard === 'badges' ? styles.cardClicked : ''}`}
            onClick={() => handleCardClick('badges')}
          >
            <h3>Badges</h3>
            <span className={styles.badge}>🏅</span>
          </div>

          {/* Tip of the Day */}
          <div
            className={`${styles.card} ${clickedCard === 'tip' ? styles.cardClicked : ''}`}
            onClick={() => handleCardClick('tip')}
          >
            <h3>Tip of the Day!</h3>
            <p>{tips[tipIndex]}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <button onClick={()=>handleNavigate('quizzes')}>Quizzes</button>
          <button onClick={()=>handleNavigate('challenges')}>Challenges</button>
          <button onClick={()=>handleNavigate('stories')}>Stories</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;











