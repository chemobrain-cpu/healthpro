import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import InstallBanner from './components/PWA';

import Onboard from './screens/Onboard';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Quiz from './screens/Quiz';
import Quizzes from './screens/Quizzes';
import Lesson from './screens/Lesson';
import Rewards from './screens/Rewards';
import LessonDetail from './screens/Lesson-detail';
import QuizResult from './screens/QuizResult';
import DailyChallenge from './screens/DailyChallenge';
import Profile from './screens/Profile';
import Dashboard from './screens/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PrivateRoute = ({ children }) => {
  const { user } = useSelector(state => state.userAuth);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const dispatch = useDispatch();
  const [isPwa, setIsPWA] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.userAuth);

  useEffect(() => {
    const isInStandaloneMode = () =>
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsPWA(isInStandaloneMode());
  }, []);

  useEffect(() => {
    if (location.pathname === '/logout') {
      dispatch(logout());
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return (
    <div className="App">
      <Suspense>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Onboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          {/* Protected Routes */}
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/stories' element={<PrivateRoute><Lesson /></PrivateRoute>} />
          <Route path='/quiz/:id' element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path='/rewards' element={<PrivateRoute><Rewards /></PrivateRoute>} />
          <Route path='/stories/:id' element={<PrivateRoute><LessonDetail /></PrivateRoute>} />
          <Route path='/quiz-result' element={<PrivateRoute><QuizResult /></PrivateRoute>} />
          <Route path='/quizzes' element={<PrivateRoute><Quizzes /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/daily-challenge' element={<PrivateRoute><DailyChallenge /></PrivateRoute>} />
          <Route path='/challenges' element={<PrivateRoute><DailyChallenge /></PrivateRoute>} />
        </Routes>
      </Suspense>

      <InstallBanner />
      <ToastContainer />
    </div>
  );
}

export default App;



