import React, { useState, useEffect } from 'react';
import styles from './SettingsPage.module.css';
import { FaBell, FaVolumeUp, FaMoon, FaGlobe } from 'react-icons/fa';
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
} from 'react-icons/fa';
import SideBar from './Sidebar';



export default function SettingsPage() {
  const [animate, setAnimate] = useState(false);

  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Stories');
  const [settings, setSettings] = useState({
    sound: true,
    notifications: true,
    darkMode: false,
    language: 'English'
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
  };




  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isOpen);

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

 

  return <div className={styles.containers}>
        <SideBar handleNavClick ={handleNavClick} activePage={activePage} toggleSidebar={toggleSidebar} isOpen = {isOpen}/>




      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
            <FaBars />
          </div>
          <h2 className={styles.title}>{activePage}</h2>
          <FaUserCircle className={styles.avatarPlaceholder} />
        </header>
        <div className={`${styles.wrapper} ${animate ? styles.fadeIn : ''}`}>
          <main className={styles.content}>
            <p className={styles.title}>Settings</p>

            <div className={styles.settingCard}>
              <div className={styles.label}>
                <FaVolumeUp />
                <span>Sound</span>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" checked={settings.sound} onChange={() => toggleSetting('sound')} />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingCard}>
              <div className={styles.label}>
                <FaBell />
                <span>Notifications</span>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" checked={settings.notifications} onChange={() => toggleSetting('notifications')} />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingCard}>
              <div className={styles.label}>
                <FaMoon />
                <span>Dark Mode</span>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" checked={settings.darkMode} onChange={() => toggleSetting('darkMode')} />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.settingCard}>
              <div className={styles.label}>
                <FaGlobe />
                <span>Language</span>
              </div>
              <select className={styles.dropdown} value={settings.language} onChange={handleLanguageChange}>
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>

            <button className={styles.saveButton}>Save Changes</button>
          </main>
        </div>
      </div>
      </div>

}


