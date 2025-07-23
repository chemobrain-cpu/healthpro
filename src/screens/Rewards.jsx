import React, { useState, useEffect } from 'react';
import styles from './Rewards.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  FaBars,
  FaUserCircle,
  FaLock,
  FaTrophy,
  FaBullseye,
  FaRocket,
  FaLightbulb,
} from 'react-icons/fa';
import SideBar from './Sidebar';
import { useSelector } from 'react-redux';

const Rewards = () => {
  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Rewards');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isOpen);
  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const badgeData = [
    { icon: <FaBullseye />, label: 'Accuracy Ace', color: '#60A5FA' },
    { icon: <FaRocket />, label: 'Fast Thinker', color: '#A78BFA' },
    { icon: <FaLightbulb />, label: 'Bright Mind', color: '#FBBF24' },
    { icon: <FaRocket />, label: 'Speed Master' },
    { icon: <FaLightbulb />, label: 'Puzzle Solver' },
    { icon: <FaBullseye />, label: 'Sharp Shooter' },
  ];

  const user = useSelector((state) => state.userAuth.user);
  const userPoints = user?.score || 0;

  const getPointsForBadge = (index) => 5 + index * 10;
  const earned = [];
  const locked = [];

  badgeData.forEach((badge, idx) => {
    const badgePoints = getPointsForBadge(idx);
    if (userPoints >= badgePoints) {
      earned.push({ ...badge, points: badgePoints });
    } else {
      locked.push({ ...badge, points: badgePoints });
    }
  });

  return (
    <div className={styles.containers}>
      <SideBar handleNavClick={handleNavClick} activePage={activePage} toggleSidebar={toggleSidebar} isOpen={isOpen} />
      {isOpen && <div className={styles.backdrop} onClick={toggleSidebar}></div>}

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
            <FaBars />
          </div>
          <h2 className={styles.title}>{activePage}</h2>
          <FaUserCircle className={styles.avatarPlaceholder} />
        </header>

        <div className={styles.reward}>
          <p className={styles.heading}>Badges & Rewards</p>

          {/* Earned Badges */}
          <div className={styles.section}>
            <h3 className={styles.subheading}>Earned</h3>
            <div className={styles.badgeGrid}>
              {earned.map((badge, idx) => (
                <div key={idx} className={styles.badgeCard}>
                  <div className={styles.icon} style={{ color: badge.color || '#10b981' }}>
                    {badge.icon}
                  </div>
                  <div className={styles.points}>{badge.points} points</div>
                  <div className={styles.label}>{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div className={styles.section}>
            <h3 className={styles.subheading}>Locked</h3>
            <div className={styles.badgeGrid}>
              {locked.map((badge, idx) => (
                <div key={idx} className={`${styles.badgeCard} ${styles.locked}`}>
                  <div className={styles.icon}>{badge.icon}</div>
                  <FaLock className={styles.lockIcon} />
                  <div className={styles.label}>{badge.label}</div>
                  <div className={styles.points}>{badge.points} points</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className={styles.progressCard}>
            <FaTrophy className={styles.trophyIcon} />
            <div className={styles.levelText}>Level {Math.floor(userPoints / 250) + 1}</div>
            <div className={styles.progressBar}>
              <div
                className={`${styles.progress} ${styles.animateHorizontal} ${styles.animateVertical}`}
                style={{ width: `${(userPoints % 250) / 2.5}%` }}
              ></div>
            </div>
            <div className={styles.progressText}>{userPoints} / 250</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;

