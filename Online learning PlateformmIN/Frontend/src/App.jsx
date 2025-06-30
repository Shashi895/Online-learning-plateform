import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import AboutUs from './Pages/About';
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';

import RequireAuth from './Components/auth/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/User/Profile';
import Checkout from './Pages/Payment/Checkout';
import DisplayLecture from './Pages/Dashboard/DisplayLecture';
import AddLecture from './Pages/Dashboard/AddLecture';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import { getUserData } from './Redux/Slices/AuthSlice';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // if logged in (flag saved in localStorage), fetch fresh user data:
    if (isLoggedIn) {
      dispatch(getUserData());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/description" element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/course/displaylectures" element={<DisplayLecture />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
