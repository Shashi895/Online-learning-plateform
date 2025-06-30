import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData } from '../../Redux/Slices/AuthSlice';
import InputBox from '../../Components/InputBox/InputBox';
import Layout from '../../Layout/Layout';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice';

export default function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const [activeTab, setActiveTab] = useState('courses');
  const [isUpdating, setIsUpdating] = useState(false);
  const [userInput, setUserInput] = useState({
    name: userData?.fullName || '',
    userId: null,
  });
  const [isChanged, setIsChanged] = useState(false);

  async function onFormSubmit(e) {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData();
    formData.append('fullName', userInput.name);
    const data = { formData, id: userInput.userId };

    const response = await dispatch(updateUserData(data));
    if (response?.payload?.success) {
      await dispatch(getUserData());
      setIsChanged(false);
    }

    setIsUpdating(false);
  }

  async function handleCancelSubscription() {
    const res = await dispatch(cancelCourseBundle());
    if (res?.payload?.success) {
      await dispatch(getUserData());
    }
  }

  useEffect(() => {
    setIsChanged(userInput.name !== userData?.fullName);
  }, [userInput, userData]);

  useEffect(() => {
    async function fetchUser() {
      await dispatch(getUserData());
    }

    if (Object.keys(userData).length < 1) fetchUser();
  }, [dispatch, userData]);

  useEffect(() => {
    setUserInput({
      ...userInput,
      name: userData?.fullName,
      userId: userData?._id,
    });
  }, [userData]);

  // Get initials from course title
  const getInitials = (title) => {
    return title
      .split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <Layout hideFooter={true}>
      <section className="flex flex-col gap-6 items-center py-6 px-2 min-h-[90vh] bg-slate-100 dark:bg-gray-800">
        <div className="w-full max-w-5xl mx-auto">
          {/* Tab Switch */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === 'courses'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
              }`}
            >
              Enrolled Courses
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === 'profile'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
              }`}
            >
              Profile Settings
            </button>
          </div>

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-violet-600 dark:text-purple-400 mb-4">
                Enrolled Courses
              </h2>
              {userData?.enrolledCourses?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.enrolledCourses.map((course) => (
                    <div
                      key={course._id}
                      className="flex flex-col border rounded-lg shadow-md bg-white dark:bg-base-200 transition-transform hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4 p-4 border-b">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white text-lg font-semibold">
                          {getInitials(course.title)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {course.title}
                        </h3>
                      </div>
                      <div className="p-4 flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {course.description}
                        </p>
                        <span className="inline-block text-xs text-gray-500 dark:text-gray-400">
                          Category: {course.category}
                        </span>
                      </div>
                      <div className="px-4 py-2 border-t text-sm text-gray-500 dark:text-gray-400">
                        Course by: {course.createdBy}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  You have not enrolled in any courses yet.
                </p>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form
              autoComplete="off"
              noValidate
              onSubmit={onFormSubmit}
              className="flex flex-col dark:bg-base-100 gap-6 rounded-lg md:py-6 py-5 md:px-6 px-3 shadow-md dark:shadow-xl bg-white dark:bg-gray-700"
            >
              <h2 className="text-2xl text-center font-bold text-violet-600 dark:text-purple-400">
                Profile Settings
              </h2>

              <div className="flex flex-wrap gap-4">
                <InputBox
                  label={'Name'}
                  name={'name'}
                  type={'text'}
                  placeholder={'Enter your name'}
                  value={userInput.name}
                  onChange={(e) =>
                    setUserInput({ ...userInput, name: e.target.value })
                  }
                  className="md:w-[48%] w-full text-sm"
                  labelClassName="text-sm"
                />

                <InputBox
                  label={'Email'}
                  name={'email'}
                  type={'email'}
                  value={userData?.email || ''}
                  className="md:w-[48%] w-full text-sm"
                  labelClassName="text-sm"
                  disabled
                />

                <InputBox
                  label={'Role'}
                  name={'role'}
                  type={'text'}
                  value={userData?.role}
                  className="md:w-[48%] w-full text-sm"
                  labelClassName="text-sm"
                  disabled
                />

                <InputBox
                  label={'Subscription'}
                  name={'subscription'}
                  type={'text'}
                  value={userData?.subscription?.status || 'Not Active'}
                  className="md:w-[48%] w-full text-sm"
                  labelClassName="text-sm"
                  disabled
                />
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <button
                  type="submit"
                  className="py-2 rounded-md bg-yellow-500 text-white font-medium text-sm md:w-[48%] w-full"
                  disabled={!isChanged || isUpdating}
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>

                {userData?.subscription?.status === 'active' && (
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    className="py-2 rounded-md bg-red-500 text-white font-medium text-sm md:w-[48%] w-full"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
