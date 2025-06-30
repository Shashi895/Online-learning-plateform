import React, { useEffect } from "react";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";
import { getAllCourses, deleteCourse } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(
  ArcElement,
  CategoryScale,
  Legend,
  Title,
  Tooltip
);

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments } = useSelector((state) => state.razorpay);
  const myCourses = useSelector((state) => state.course.coursesData);

  const userData = {
    labels: ["Registered Users", "Enrolled Users"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#facc15", "#22c55e"],
        borderColor: ["#facc15", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <Layout hideFooter={true}>
      <section className="py-6 flex flex-col gap-10 bg-slate-100 dark:bg-gray-800 min-h-[100vh] px-4 md:px-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-yellow-500">
          Admin <span className="text-violet-500">Dashboard</span>
        </h1>

        {/* USER CHART SECTION */}
        <div className="max-w-5xl w-full mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 space-y-6">
          <div className="w-full h-60">
            <Pie
              data={userData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow">
              <div>
                <p className="text-sm text-gray-700 dark:text-white">Registered Users</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{allUsersCount}</h3>
              </div>
              <FaUsers className="text-yellow-500 text-4xl" />
            </div>
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow">
              <div>
                <p className="text-sm text-gray-700 dark:text-white">Subscribed Users</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{subscribedCount}</h3>
              </div>
              <FaUsers className="text-green-500 text-4xl" />
            </div>
          </div>
        </div>

        {/* COURSES OVERVIEW */}
        <div className="w-full max-w-[1400px] mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">Courses Overview</h2>
            <button
              onClick={() => navigate("/course/create")}
              className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-2 rounded-md text-sm font-semibold transition"
            >
              Create New Course
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-gray-900 dark:text-slate-200">
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="px-3 py-2">S No</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Instructor</th>
                  <th className="px-3 py-2">Lectures</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-100">
                {myCourses?.map((course, idx) => (
                  <tr key={course._id} className="border-b border-gray-300 dark:border-gray-600">
                    <td className="px-3 py-2">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <textarea
                        readOnly
                        className="w-40 bg-transparent resize-none"
                        value={course.title}
                      ></textarea>
                    </td>
                    <td className="px-3 py-2">{course.category}</td>
                    <td className="px-3 py-2">{course.createdBy}</td>
                    <td className="px-3 py-2">{course.numberOfLectures}</td>
                    <td className="px-3 py-2">
                      <textarea
                        readOnly
                        className="w-60 bg-transparent resize-none"
                        value={course.description}
                      ></textarea>
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
                        onClick={() => onCourseDelete(course._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
