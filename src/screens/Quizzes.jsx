import styles from './QuizSelectionPage.module.css';
import { useEffect, useState } from 'react';
import { FaBullseye, FaRocket, FaLightbulb, FaBars, FaUserCircle } from 'react-icons/fa';
import SideBar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const badges = [
    { icon: <FaBullseye />, label: 'Accuracy Ace' },
    { icon: <FaRocket />, label: 'Fast Thinker' },
    { icon: <FaLightbulb />, label: 'Bright Mind' },
];

export default function QuizSelectionPage() {
    const [animate, setAnimate] = useState(false);
    const [isOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState('Quizzes');
    const navigate = useNavigate();
    let { allQuiz: quizzes } = useSelector(state => state.userAuth);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!isOpen);

    const handleNavClick = (page) => {
        setActivePage(page);
        setSidebarOpen(false);
    };

    const handleNavigate = (id) => {
        navigate(`/quiz/${id}`);
    };

    // ✅ Remove quizzes with duplicate titles
    const uniqueQuizzes = Array.from(
        new Map(quizzes.map((quiz) => [quiz.title, quiz])).values()
    );

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

                <div className={`${styles.wrapper} ${animate ? styles.fadeIn : ''}`}>
                    {uniqueQuizzes.length === 0 ? <p className={styles.title}>Choose a Quiz</p> : ""}

                    {uniqueQuizzes.length === 0 ? (
                        <div className={styles.emptyContainer}>
                            <h3>No quizzes available</h3>
                            <p>Looks like there are no quizzes yet. Please check back later!</p>
                            <button className={styles.startBtn} onClick={() => navigate('/dashboard')}>
                                Go to Dashboard
                            </button>
                        </div>
                    ) : (
                        <div className={styles.quizGrid}>
                            {uniqueQuizzes.map((quiz, index) => (
                                <div
                                    key={index}
                                    className={styles.quizCard}
                                    style={{ background: quiz.color }}
                                    onClick={() => handleNavigate(quiz.title)}
                                >
                                    <h3>{quiz.title}</h3>
                                    <p>{quiz.description}</p>
                                    <button className={styles.startBtn}>Start</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
