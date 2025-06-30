import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import heroPng from "../assets/images/hero.png";

export default function HomePage() {
  return (
    <Layout>
      <section className="min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-14 py-10 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Text Content */}
        <div className="md:w-1/2 w-full space-y-5">
           <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="dark:text-white  text-gray-800">Master</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Tomorrow's
              </span>
              <br />
              <span className="dark:text-white  text-gray-800">Skills Today</span>
            </h1>

            <p className="text-xl dark:text-white  text-gray-800 leading-relaxed max-w-lg">
              Join thousands of professionals advancing their careers with our 
              cutting-edge courses designed by industry experts.
            </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/courses">
              <button className="px-4 py-2 bg-yellow-500 text-white text-sm md:text-base font-medium rounded-md shadow hover:shadow-lg hover:bg-yellow-600 transition-all duration-300">
                Explore Courses
              </button>
            </Link> 
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={heroPng}
            alt="Learning platform"
            className="max-w-full h-auto md:max-h-[500px] drop-shadow-lg animate-fade-in"
          />
        </div>
      </section>
    </Layout>
  );
}
