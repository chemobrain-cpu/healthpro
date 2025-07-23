import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { markFun } from '../store/action/appStorage';

const Quiz = () => {
  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Quizzes');
  const [isLoading, setIsLoading] = useState(false);
  const avatarUrl = '';
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { allQuiz, user } = useSelector(state => state.userAuth);

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fallingEmojis, setFallingEmojis] = useState([]);
  const [initialized, setInitialized] = useState(false); // ✅ New flag

  const partyEmojis = [
    '🎉', '🎊', '🥳', '🎈', '✨', '💃', '🕺', '🍾',
    '🎂', '🎇', '🎆', '🎶', '🎵', '🎤', '🎧', '🪩',
    '🍸', '🍹', '🍷', '🪅', '🪄', '🧁', '🪗', '🥂'
  ];

  useEffect(() => {
    if (!initialized && allQuiz?.length && id) {
      const filtered = allQuiz
        .filter(q => q.title?.toLowerCase() === id.toLowerCase())
        .map(q => ({
          _id: q._id,
          title: q.title,
          question: q.question,
          options: JSON.parse(q.options),
          answer: parseInt(q.answer),
        }));

      setQuestions(filtered);
      setInitialized(true); // ✅ Prevent re-initialization
    }
  }, [allQuiz, id, initialized]);

  const currentQuestion = questions[currentQ];

  const handleOptionClick = (index) => {
    setSelected(index);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    const interval = setInterval(() => {
      const newEmoji = {
        id: Math.random().toString(36).substr(2, 9),
        emoji: partyEmojis[Math.floor(Math.random() * partyEmojis.length)],
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2,
        fontSize: 1 + Math.random() * 2,
      };
      setFallingEmojis(prev => [...prev, newEmoji]);
      setTimeout(() => {
        setFallingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
      }, 5000);
    }, 150);
    setTimeout(() => {
      clearInterval(interval);
      setShowConfetti(false);
    }, 5000);
  };

  const handleNext = async () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQ] = selected;
    const gotAns = selected === currentQuestion.answer;

    if (gotAns) {
      triggerConfetti();
    } else {
      alert('Incorrect answer!');
    }

    setAnswers(updatedAnswers);
    setSelected(null);
    setCurrentQ(prev => prev + 1);

    setIsLoading(true);
    await dispatch(markFun({ questionId: currentQuestion._id, userId: user._id, gotAns }));
    setIsLoading(false);
  };

  const handlePrev = () => {
    setCurrentQ(prev => prev - 1);
    setSelected(answers[currentQ - 1]);
  };

  const handleSubmit = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQ] = selected;
    if (selected === currentQuestion.answer) {
      triggerConfetti();
    }

    let score = 0;
    questions.forEach((q, i) => {
      if (updatedAnswers[i] === q.answer) {
        score++;
      }
    });

    navigate('/quiz-result', {
      state: { score, total: questions.length },
    });
  };

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

  if (!questions.length) {
    return (
      <div className={styles.quizContainer}>
        <h2>No quiz found for topic: {id}</h2>
      </div>
    );
  }

  return (
    <div className={styles.containers}>
      {showConfetti && (
        <div className={styles.confetti}>
          {fallingEmojis.map(({ id, emoji, left, animationDuration, fontSize }) => (
            <span
              key={id}
              className={styles.emoji}
              style={{
                left: `${left}%`,
                animationDuration: `${animationDuration}s`,
                fontSize: `${fontSize}rem`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

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
          {avatarUrl ? (
            <img src={avatarUrl} alt="User avatar" className={styles.avatar} />
          ) : (
            <FaUserCircle className={styles.avatarPlaceholder} />
          )}
        </header>

        <div className={styles.quizContainer}>
          <p className={styles.title}>Quiz Topic: {id}</p>

          <div className={styles.card}>
            <h3 className={styles.question}>{currentQuestion.question}</h3>
            <ul className={styles.options}>
              {currentQuestion.options.map((option, i) => (
                <li
                  key={i}
                  className={`${styles.option} ${selected === i ? styles.selected : ''}`}
                  onClick={() => handleOptionClick(i)}
                >
                  {option}
                </li>
              ))}
            </ul>

            <div className={styles.navigation}>
              {currentQ > 0 && (
                <button onClick={handlePrev} className={styles.prevBtn}>Previous</button>
              )}
              {currentQ < questions.length - 1 && (
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className={styles.nextBtn}
                >
                  Next
                </button>
              )}
              {currentQ === questions.length - 1 && (
                <button
                  onClick={handleSubmit}
                  disabled={selected === null}
                  className={styles.submitBtn}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

