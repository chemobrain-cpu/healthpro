import styles from './QuizSelectionPage.module.css';

import {
  FaHome,
  FaPenFancy,
  FaBolt,
  FaBookOpen,
  FaCog,
  FaUser,
  FaGift,
} from 'react-icons/fa';


import { useNavigate } from 'react-router-dom';


export default function SideBar({activePage,toggleSidebar,isOpen}) {
const navigate = useNavigate()


  const handleNavClick = (data)=>{
    navigate(`/${data}`)
  }

  const sidebarLinks = [
    { page: 'Dashboard', icon: <FaHome /> },
    { page: 'Quizzes', icon: <FaPenFancy /> },
    { page: 'Challenges', icon: <FaBolt /> },
    { page: 'Rewards', icon: <FaGift/> },
    { page: 'Stories', icon: <FaBookOpen /> },
    { page: 'Profile', icon: <FaUser/> },
  ];

  return <>
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.closeBtn} onClick={toggleSidebar}>×</div>
      <div className={styles.logo}>HealthPro</div>
      <nav className={styles.nav}>
        {sidebarLinks.map(({ page, icon }) => (
          <a
            key={page}
            href="#"
            className={activePage === page ? styles.activeLink : ''}
            onClick={() => handleNavClick(page)}
          >
            <span style={{ marginRight: '8px' }}>{icon}</span> {page}
          </a>
        ))}
      </nav>
    </aside>

    {isOpen && <div className={styles.backdrop} onClick={toggleSidebar}></div>}


  </>

}