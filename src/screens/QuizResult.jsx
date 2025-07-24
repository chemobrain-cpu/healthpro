import styles from './QuizResults.module.css';
import { motion } from 'framer-motion';
import { FaRedo } from 'react-icons/fa';
import { FaBullseye, FaRocket, FaLightbulb, FaLock } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle, FaTrophy } from 'react-icons/fa';
import SideBar from './Sidebar';

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

// Badge data + points requirement
const badgeData = [
    { icon: <FaBullseye />, label: 'Accuracy Ace', color: '#60A5FA' },
    { icon: <FaRocket />, label: 'Fast Thinker', color: '#A78BFA' },
    { icon: <FaLightbulb />, label: 'Bright Mind', color: '#FBBF24' },
    { icon: <FaRocket />, label: 'Speed Master' },
    { icon: <FaLightbulb />, label: 'Puzzle Solver' },
    { icon: <FaBullseye />, label: 'Sharp Shooter' },
];

// Points needed per badge
const getPointsForBadge = (index) => 5 + index * 10;

const QuizResults = () => {
    const [isOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState('Quiz Result');
    const navigate = useNavigate();
    const location = useLocation();
    const { score = 0, total = 0 } = location.state || {};
    

    const toggleSidebar = () => setSidebarOpen(!isOpen);
    const handleNavClick = (page) => {
        setActivePage(page);
        setSidebarOpen(false);
    };

    // Determine earned & locked badges based on score
    const earned = [];
    const locked = [];
    badgeData.forEach((badge, idx) => {
        const badgePoints = getPointsForBadge(idx);
        if (score >= badgePoints) {
            earned.push({ ...badge, points: badgePoints });
        } else {
            locked.push({ ...badge, points: badgePoints });
        }
    });

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

                <motion.div
                    className={styles.wrapper}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className={styles.scoreCard} variants={childVariants}>
                        <p className={styles.score}>
                            <strong>Total Score:</strong> {score} / {total}
                        </p>
                    </motion.div>

                    {/* Earned badges */}
                    <motion.div className={styles.badgesSection} variants={childVariants}>
                        <h3 className={styles.badgesTitle}>Badges Unlocked</h3>
                        <div className={styles.badges}>
                            {earned.length > 0 ? (
                                earned.map((badge, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={styles.badge}
                                        whileHover={{ scale: 1.1, rotate: -1 }}
                                        variants={childVariants}
                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                    >
                                        <span
                                            className={styles.icon}
                                            style={{ color: badge.color || '#10b981' }}
                                        >
                                            {badge.icon}
                                        </span>
                                        <span>{badge.label}</span>
                                        <p className={styles.points}>{badge.points} pts</p>
                                    </motion.div>
                                ))
                            ) : (
                                <p>No badges earned yet. Keep practicing!</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Locked badges */}
                    <motion.div className={styles.badgesSection} variants={childVariants}>
                        <h3 className={styles.badgesTitle}>Locked Badges</h3>
                        <div className={styles.badges}>
                            {locked.map((badge, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`${styles.badge} ${styles.locked}`}
                                    variants={childVariants}
                                >
                                    <span className={styles.icon}>{badge.icon}</span>
                                    <FaLock className={styles.lockIcon} />
                                    <span>{badge.label}</span>
                                    <p className={styles.points}>{badge.points} pts</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Retry/Home button */}
                    <motion.div className={styles.buttons} variants={childVariants}>
                        <motion.button
                            className={styles.retry}
                            whileHover={{ scale: 1.05, backgroundColor: '#ffdab8' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/dashboard')}
                        >
                            <FaRedo className={styles.retryIcon} />
                            Home
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default QuizResults;

