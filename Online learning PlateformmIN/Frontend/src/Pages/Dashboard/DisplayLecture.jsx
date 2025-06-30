import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseLectures,
  deleteCourseLecture,
} from "../../Redux/Slices/LectureSlice";
import Layout from "../../Layout/Layout";

export default function DisplayLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  const currentLecture = lectures?.[currentVideo];

  return (
    <Layout hideFooter hideNav hideBar>
      <section className="flex flex-col gap-6 items-center md:py-8 py-0 px-0 h-screen overflow-y-scroll">
        <div className="flex flex-col dark:bg-base-100 relative md:gap-12 gap-5 rounded-lg md:py-10 md:pt-3 py-0 pt-3 md:px-7 px-0 md:w-[780px] w-full h-full overflow-y-hidden shadow-custom dark:shadow-xl">
          <h1 className="text-center relative md:px-0 px-3 w-fit dark:text-purple-500 md:text-2xl text-lg font-bold font-inter after:content-[' ']  after:absolute after:-bottom-2  md:after:left-0 after:left-3 after:h-[3px] after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
            Course:{" "}
            <span className="text-violet-500 dark:text-yellow-500 font-nunito-sans">
              {state?.title}
            </span>
          </h1>

          <div className="flex md:flex-row flex-col md:justify-between w-full h-full">
            {/* Left: Video & PDF */}
            <div className="md:w-[48%] w-full md:p-3 p-1 overflow-y-scroll md:h-full h-[40%] flex flex-col gap-4">
              {/* Video */}
              <div className="w-full h-[200px] border bg-[#0000003d] shadow-lg rounded">
                {currentLecture?.video?.url ? (
                  <video
                    src={currentLecture.video.url}
                    controls
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-center p-4">Video not available</p>
                )}
              </div>

              {/* PDF */}
              {currentLecture?.pdf?.url && (
                <div className="w-full h-[500px] border rounded shadow-md">
                  <iframe
                    src={currentLecture.pdf.url}
                    width="100%"
                    height="100%"
                    title="Lecture Notes"
                    className="rounded"
                  ></iframe>
                </div>
              )}

              {/* Title & Description */}
              <div className="py-4 w-full">
                <h2 className="text-lg font-semibold text-blue-500 dark:text-yellow-500">
                  Title:
                </h2>
                <p className="text-gray-700 dark:text-white">{currentLecture?.title}</p>

                <h2 className="text-lg font-semibold mt-2 text-blue-500 dark:text-yellow-500">
                  Description:
                </h2>
                <p className="text-gray-700 dark:text-slate-300">
                  {currentLecture?.description}
                </p>
              </div>
            </div>

            {/* Right: Lecture List */}
            <div className="md:w-[48%] pb-12 md:h-full h-[60%] overflow-y-scroll">
              <ul className="w-full md:p-2 p-0 flex flex-col gap-5 shadow-sm">
                <li className="font-semibold bg-slate-50 dark:bg-slate-100 p-3 rounded-md shadow-lg sticky top-0 text-xl text-[#2320f7] font-nunito-sans flex items-center justify-between">
                  <p>Lectures list</p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                      className="btn-primary px-3 py-2 font-inter rounded-md font-semibold text-sm"
                    >
                      Add new lecture
                    </button>
                  )}
                </li>

                {lectures?.map((lecture, idx) => (
                  <li className="space-y-2" key={lecture._id}>
                    <p
                      onClick={() => setCurrentVideo(idx)}
                      className={`cursor-pointer text-base font-[500] font-open-sans ${
                        currentVideo === idx
                          ? "text-blue-600 dark:text-yellow-500"
                          : "text-gray-600 dark:text-white"
                      }`}
                    >
                      <span className="font-inter">{idx + 1}. </span>
                      {lecture.title}
                    </p>
                   
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
