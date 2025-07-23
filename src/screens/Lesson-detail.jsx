import React, { useState, useEffect } from 'react';
import styles from './LessonDetail.module.css';
import 'aos/dist/aos.css';
import { FiMessageCircle } from 'react-icons/fi';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import SideBar from './Sidebar';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const StoryDetail = () => {
  const [isOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Stories');
  const [comments, setComments] = useState([
    { id: 1, user: 'Faith', message: 'I love this! I’ll brush twice every day!', time: '2 mins ago' },
    { id: 2, user: 'Samuel', message: 'Fun to read and easy to understand!', time: '10 mins ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  const toggleSidebar = () => setSidebarOpen(!isOpen);
  const { allStories } = useSelector((state) => state.userAuth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);

  useEffect(() => {
    if (allStories?.length && id) {
      const found = allStories.find(
        (story) => story.description?.replace(/\s+/g, '').toLowerCase() === id?.toLowerCase()
      );
      if (found) {
        setStory(found);
      }
    }
  }, [allStories, id]);

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          user: 'You',
          message: newComment,
          time: 'Just now',
        },
      ]);
      setNewComment('');
    }
  };

  if (!story) {
    return (
      <div className={styles.containers}>
        <h2>Story not found.</h2>
      </div>
    );
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

        <div className={styles.card}>
          <h1 className={styles.title}>{story.title}</h1>
          <p className={styles.description}>{story.description}</p>
          <div className={styles.storyBox}>{story.pages}</div>

          <div className={styles.buttonGroup}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              Back to Stories
            </button>
            <button className={styles.quizBtn} onClick={() => navigate(`/quizzes`)}>
              Take Quiz
            </button>
          </div>
        </div>

        <div className={styles.commentSection}>
          <h2 className={styles.commentTitle}>
            <FiMessageCircle className={styles.chatIcon} /> Student Reflections
          </h2>

          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.avatar}>{comment.user.charAt(0)}</div>
              <div>
                <p className={styles.commentUser}>{comment.user}</p>
                <p className={styles.commentText}>{comment.message}</p>
                <span className={styles.commentTime}>{comment.time}</span>
              </div>
            </div>
          ))}

          <div className={styles.newCommentBox}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave your thoughts..."
              className={styles.textarea}
            />
            <button onClick={addComment} className={styles.postBtn}>
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;

