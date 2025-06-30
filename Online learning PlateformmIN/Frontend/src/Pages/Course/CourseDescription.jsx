import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getUserData } from '../../Redux/Slices/AuthSlice';

export default function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api_base_url = 'http://localhost:5000';

  const { role, data, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!state) {
      navigate('/courses');
    }
  }, [state, navigate]);

  // Helper to get initials
  const getInitials = (title) => {
    if (!title) return '';
    return title
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSubscribe = async () => {
    try {
      if (!isLoggedIn) {
        toast.error('Please log in to subscribe');
        navigate('/login');
        return;
      }

      const loadingToast = toast.loading('Subscribing...');
      const res = await axios.post(
        `${api_base_url}/api/v1/user/subscribe`,
        { courseId: state?._id },
        { withCredentials: true }
      );
      toast.success(res?.data?.message || 'Subscribed!', { id: loadingToast });

      await dispatch(getUserData());

      navigate('/user/profile');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Subscription failed');
      console.error('Subscription failed:', error);
    }
  };

  const isEnrolled = data?.enrolledCourses?.some(
    (course) => course._id === state?._id
  );
  const canWatch = role === 'ADMIN' || isEnrolled;

  console.log('isEnrolled:', isEnrolled);

  return (
    <Layout>
      <section className="min-h-[90vh] py-10 px-4 md:px-10 lg:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side: Thumbnail + Info */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg shadow-lg border dark:border-gray-700 flex items-center justify-center bg-yellow-100 dark:bg-gray-800 text-yellow-600 dark:text-yellow-400 text-5xl font-bold h-80">
              {state?.thumbnail?.secure_url ? (
                <img
                  src={state?.thumbnail?.secure_url}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                getInitials(state?.title)
              )}
            </div>

            <div className="text-sm md:text-base space-y-2 border-t pt-4 border-gray-300 dark:border-gray-700">
              <p className="font-medium">
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                  Total Lectures:{' '}
                </span>
                {state?.numberOfLectures}
              </p>
              <p className="font-medium">
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                  Instructor:{' '}
                </span>
                {state?.createdBy}
              </p>
            </div>
          </div>

          {/* Right Side: Title, Description, Action */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 font-lato relative w-fit mb-3">
              {state?.title}
              <span className="block h-1 w-3/5 bg-purple-400 dark:bg-purple-600 rounded-full mt-2" />
            </h1>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Course Description</h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-violet-300 leading-relaxed whitespace-pre-wrap">
                {state?.description}
              </p>
            </div>

            {/* Action Button */}
            {canWatch ? (
              <button
                onClick={() =>
                  navigate('/course/displaylectures', { state: { ...state } })
                }
                className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white text-base font-semibold py-3 rounded-md transition duration-300"
              >
                Watch Lectures
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white text-base font-semibold py-3 rounded-md transition duration-300"
              >
                Subscribe Now
              </button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
