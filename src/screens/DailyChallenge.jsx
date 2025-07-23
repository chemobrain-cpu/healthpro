import React, { useState, useEffect } from 'react';
import styles from './DailyChallenge.module.css';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    FaBars,
    FaUserCircle,
    FaFireAlt,
    FaPlusCircle,
    FaBookDead, // For empty state
} from 'react-icons/fa';
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { markFun } from '../store/action/appStorage';


const DailyChallenge = () => {
    const [isOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState('Challenges');
    const { allChallenge, user } = useSelector((state) => state.userAuth);
    console.log(allChallenge)
    const streak = 3;
    const points = 5;

    const dispatch = useDispatch()

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const toggleSidebar = () => setSidebarOpen(!isOpen);

    const handleNavClick = (page) => {
        setActivePage(page);
        setSidebarOpen(false);
    };


    const handleHandler = async() => {
        let questionId = allChallenge[0]._id
        let userId = user._id
        await dispatch(markFun({ questionId: questionId, userId: userId, gotAns:true }));
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

                <motion.div
                    className={styles.wrapper}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.p
                        className={styles.title}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Daily Challenge
                    </motion.p>

                    {allChallenge && allChallenge.length > 0 ? (
                        <>
                            <motion.div
                                className={styles.challengeCard}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                            >
                                <div className={styles.challengeText}>
                                    <p className={styles.label}>Today's Challenge</p>
                                    <h3 className={styles.challenge}>{allChallenge[0].guide}</h3>
                                </div>

                                <motion.button
                                    className={styles.doneButton}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}

                                    onClick={handleHandler}
                                >
                                    Mark as Done
                                </motion.button>
                            </motion.div>

                            <div className={styles.tracker}>
                                <motion.div
                                    className={styles.trackerItem}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <FaFireAlt className={styles.fireIcon} />
                                    </motion.div>
                                    <span>Streak: {streak}</span>
                                </motion.div>

                                <motion.div
                                    className={styles.trackerItem}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.8 }}
                                    >
                                        <FaPlusCircle className={styles.plusIcon} />
                                    </motion.div>
                                    <span>+{points} Points</span>
                                </motion.div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <FaBookDead size={60} color="#092b4c" />
                            <p>No daily challenge available right now.</p>
                            <button className={styles.doneButton} onClick={() => window.location.reload()}>
                                Try Again Later
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default DailyChallenge;

