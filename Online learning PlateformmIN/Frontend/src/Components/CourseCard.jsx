import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaBookOpen, FaUser } from 'react-icons/fa';

export default function CourseCard({ data }) {
  const navigate = useNavigate();

  // Function to extract initials (first letters of first two words)
  const getInitials = (title) => {
    if (!title) return '';
    const words = title.split(' ');
    const initials = words
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
  };

  return (
    <div
      onClick={() => navigate('/courses/description/', { state: { ...data } })}
      className="w-full max-w-sm bg-white dark:bg-zinc-800 rounded-2xl shadow-lg dark:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.015] cursor-pointer group"
    >
      <div className="relative h-48 flex items-center justify-center bg-gray-100 dark:bg-zinc-700 overflow-hidden">
        {data?.thumbnail?.secure_url ? (
          <img
            src={data?.thumbnail?.secure_url}
            alt="Course Thumbnail"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-5xl font-bold text-yellow-500 dark:text-yellow-400">
            {getInitials(data?.title)}
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white dark:bg-zinc-700 p-2 rounded-full shadow-md">
          <FaPlay className="text-yellow-500 dark:text-yellow-400 text-lg" />
        </div>
      </div>

      <div className="p-4 space-y-3 text-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold line-clamp-2">{data?.title}</h2>

        <p className="text-sm font-normal text-gray-600 dark:text-gray-300 line-clamp-2">
          {data?.description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium">
          <FaBookOpen className="text-yellow-500 dark:text-yellow-400" />
          <span>Category: {data?.category}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <FaBookOpen className="text-yellow-500 dark:text-yellow-400" />
          <span>Total Lectures: {data?.numberoflectures}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <FaUser className="text-yellow-500 dark:text-yellow-400" />
          <span>Instructor: {data?.createdBy}</span>
        </div>
      </div>
    </div>
  );
}
