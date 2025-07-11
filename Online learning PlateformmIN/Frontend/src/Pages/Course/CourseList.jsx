import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";

export default function CourseList() {
  const dispatch = useDispatch();

  const { coursesData } = useSelector((state) => state.course);

  async function fetchCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-14 md:py-6 py-5 md:px-20 px-3 min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="md:text-2xl text-2xl w-fit text-blue-600 dark:text-white font-inter font-[500] after:content-[' '] relative after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
          Explore the courses
          
        </h1>
        {/* course container */}
        <div className="flex gap-12 md:justify-start justify-center flex-wrap">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </section>
    </Layout>
  );
}
