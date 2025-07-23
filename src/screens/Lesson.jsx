import React, { useState, useEffect } from 'react';
import styles from './Lesson.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaHome,
  FaPenFancy,
  FaBolt,
  FaBookOpen,
  FaCog,
  FaBars,
  FaUserCircle,
  FaBookDead, // New icon for empty state
} from 'react-icons/fa';
import SideBar from './Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Lesson = () => {
  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Stories');
  let {allStories } = useSelector((state) => state.userAuth);
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isOpen);

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const sidebarLinks = [
    { page: 'Dashboard', icon: <FaHome /> },
    { page: 'Quizzes', icon: <FaPenFancy /> },
    { page: 'Challenges', icon: <FaBolt /> },
    { page: 'Stories', icon: <FaBookOpen /> },
    { page: 'Settings', icon: <FaCog /> },
  ];


  const navigateHandler = (id)=>{
   navigate(`/stories/${id.replace(/\s+/g, '')}`)
  }

  return (
    <div className={styles.containers}>
      <SideBar
        handleNavClick={handleNavClick}
        activePage={activePage}
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
      />

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
            <FaBars />
          </div>
          <h2 className={styles.title}>{activePage}</h2>
          <FaUserCircle className={styles.avatarPlaceholder} />
        </header>

        <div className={styles.storyContainer}>
        {allStories && allStories.length > 0 ?<p className={styles.heading}>Fun Stories to Learn From</p>:''}

          {allStories && allStories.length > 0 ? (
            <div className={styles.grid}>
              {allStories.map((story, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.content}>
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                    <button className={styles.button} onClick={()=>navigateHandler(story.description)}>Start Story</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No health stories yet!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;

