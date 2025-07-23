import styles from './QuizResults.module.css';
import { motion } from 'framer-motion';
import { FaRedo } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { FaBullseye, FaRocket, FaLightbulb } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';


import React, { useState, useEffect } from 'react';

import {

    FaBars,
    FaUserCircle,
} from 'react-icons/fa';
import SideBar from './Sidebar';
import { useNavigate } from 'react-router-dom';


const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.2,
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};
const badges = [
    { icon: <FaBullseye />, label: 'Accuracy Ace' },
    { icon: <FaRocket />, label: 'Fast Thinker' },
    { icon: <FaLightbulb />, label: 'Bright Mind' },
];


const QuizResults = () => {
    const [isOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState('Quiz result');
    const navigate = useNavigate()
    const location = useLocation();
    const { score, total } = location.state || {};


    const toggleSidebar = () => setSidebarOpen(!isOpen);

    const handleNavClick = (page) => {
        setActivePage(page);
        setSidebarOpen(false);
    };



    return <div className={styles.containers}>
        <SideBar handleNavClick={handleNavClick} activePage={activePage} toggleSidebar={toggleSidebar} isOpen={isOpen} />



        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.mobileMenuIcon} onClick={toggleSidebar}>
                    <FaBars />
                </div>
                <h2 className={styles.title}>{activePage}</h2>
                <FaUserCircle className={styles.avatarPlaceholder} />
            </header>











            <motion.div
                className={styles.wrapper}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >


                <motion.div className={styles.scoreCard} variants={childVariants}>
                    <p className={styles.score}><strong>Total Score:</strong> {score} / {total}</p>

                </motion.div>




                <motion.div className={styles.badgesSection} variants={childVariants}>
                    <h3 className={styles.badgesTitle}>
                        Badges Unlocked
                    </h3>

                    <div className={styles.badges}>
                        {badges.map((badge, idx) => (
                            <motion.div
                                key={idx}
                                className={styles.badge}
                                whileHover={{ scale: 1.1, rotate: -1 }}
                                variants={childVariants}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                <span className={styles.icon}>{badge.icon}</span>
                                <span>{badge.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className={styles.buttons} variants={childVariants}>
                    <motion.button
                        className={styles.retry}
                        whileHover={{ scale: 1.05, backgroundColor: '#ffdab8' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { navigate('/dashboard') }}
                    >
                        <FaRedo className={styles.retryIcon} />
                        home
                    </motion.button>


                </motion.div>
            </motion.div>
        </div>
    </div>

};

export default QuizResults;
