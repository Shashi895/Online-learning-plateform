import React from "react";
import aboutMainImage from "../assets/images/about.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../Layout/Layout";

function AboutUs() {
  const settings = {};

  return (
    <Layout>
      <section className="md:py-10 py-7 mb-10 text-white overflow-x-hidden  md:px-16 px-6 min-h-[100vh] dark:bg-gray-800 bg-white">
        {/* hero */}
        <div className="flex md:flex-row flex-col-reverse items-center justify-center md:gap-10 gap-7 w-full space-y-7">
          <div className="md:w-1/2 w-full space-y-7">
            <h1 className="text-5xl text-yellow-500 font-semibold font-inter">
              LearnX{" "}
              <span className="font-nunito-sans text-gray-500">quality education</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-200 font-nunito-sans">
              Our mission is to make high-quality education accessible and
              affordable for everyone. We’ve built a platform where aspiring
              teachers and learners can connect, share knowledge, express
              creativity, and grow together. By empowering individuals through
              education, we aim to contribute meaningfully to the advancement
              and well-being of humanity.
            </p>
          </div>

          <div className="md:w-1/2 w-1/7 flex items-center justify-center">
            <img
              style={{
                filter: "drop-shadow(0px 15px 10px rgb(0,0,0));",
              }}
              alt="about main image"
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>

       
      </section>
    </Layout>
  );
}

export default AboutUs;
