import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaBars,
  FaUserCircle,
  FaUser,
  FaMedal,
  FaBullseye,
  FaRocket,
  FaLightbulb,
  FaSignOutAlt,
  FaLock,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from './ProfilePage.module.css';
import SideBar from './Sidebar';

const ProfilePage = () => {
  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Profile');
  const [animate, setAnimate] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const user = useSelector((state) => state.userAuth.user);
  const userPoints = user?.score || 0;

  useEffect(() => {
    setAnimate(true);
    AOS.init({ duration: 1000 });
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isOpen);

  const badgeData = [
    { icon: <FaBullseye size={28} />, label: 'Accuracy Ace', className: styles.badgeBlue },
    { icon: <FaRocket size={28} />, label: 'Fast Thinker', className: styles.badgePurple },
    { icon: <FaLightbulb size={28} />, label: 'Bright Mind', className: styles.badgeYellow },
    { icon: <FaRocket size={28} />, label: 'Speed Master' },
    { icon: <FaLightbulb size={28} />, label: 'Puzzle Solver' },
    { icon: <FaBullseye size={28} />, label: 'Sharp Shooter' },
  ];

  const getPointsForBadge = (index) => 5 + index * 10;
  const earned = [];
  const locked = [];

  badgeData.forEach((badge, index) => {
    const requiredPoints = getPointsForBadge(index);
    if (userPoints >= requiredPoints) {
      earned.push({ ...badge, points: requiredPoints });
    } else {
      locked.push({ ...badge, points: requiredPoints });
    }
  });

  return (
    <div className={styles.containers}>
      <SideBar activePage={activePage} toggleSidebar={toggleSidebar} isOpen={isOpen} />

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
            <FaBars />
          </div>
          <h2 className={styles.title}>{activePage}</h2>
          <FaUserCircle className={styles.avatarPlaceholder} />
        </header>

        <div className={styles.wrapper}>
          <main className={`${styles.content} ${animate ? styles.fadeIn : ''}`}>
            <div className={styles.profileHeader}>
              {avatarError ? (
                <div className={styles.avatarFallback}>
                  <FaUser size="3rem" />
                </div>
              ) : (
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className={styles.avatar}
                  onError={() => setAvatarError(true)}
                />
              )}
              <div>
                <h2>{user?.username || 'Unknown User'}</h2>
                <p className={styles.age}>Age: {user?.age || '--'}</p>
                <p className={styles.age}>School: {user?.school || '--'}</p>
                <p className={styles.age}>Total Score: {user?.score ?? 0}</p>
              </div>
            </div>

            <section>
              <p className={styles.sectionTitle}>
                <FaMedal /> Badges Earned
              </p>

              <div className={styles.cardGrid}>
                {/* Earned Badges */}
                {earned.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`${styles.card} ${badge.className || styles.badgeGreen}`}
                    title={`${badge.label} (${badge.points} pts)`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                ))}

                {/* Locked Badges */}
                {locked.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`${styles.card} ${styles.locked}`}
                    title={`${badge.label} (Locked - ${badge.points} pts)`}
                  >
                    {badge.icon}
                    <FaLock className={styles.lockIcon} />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <button className={styles.logout}>
              <FaSignOutAlt /> Log Out
            </button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


