import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputBox from "../../Components/InputBox/InputBox";
import TextArea from "../../Components/InputBox/TextArea";
import Layout from "../../Layout/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function AddLecture() {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const pdfRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    video: undefined,
    pdf: undefined,
    title: "",
    description: "",
    videoSrc: "",
    pdfSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideoChange(e) {
    const file = e.target.files[0];
    if (file?.type?.startsWith("video")) {
      const src = URL.createObjectURL(file);
      setUserInput((prev) => ({ ...prev, video: file, videoSrc: src }));
    } else {
      toast.error("Please upload a valid video file");
    }
  }

  function handlePDFChange(e) {
    const file = e.target.files[0];
    if (file?.type === "application/pdf") {
      const src = URL.createObjectURL(file);
      setUserInput((prev) => ({ ...prev, pdf: file, pdfSrc: src }));
    } else {
      toast.error("Please upload a valid PDF file");
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    const { video, pdf, title, description } = userInput;

    if (!video || !pdf || !title || !description) {
      toast.error("All fields, video, and PDF are required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("video", video);
    formData.append("pdf", pdf);
    formData.append("title", title);
    formData.append("description", description);

    const response = await dispatch(
      addCourseLecture({ formData, id: userInput.id })
    );

    if (response?.payload?.success) {
      toast.success("Lecture added successfully");
      navigate(-1);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh] bg-slate-100 dark:bg-gray-800">
        <form
          onSubmit={onFormSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-7 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[750px] w-full shadow-custom dark:shadow-xl  bg-slate-100 dark:bg-gray-500"
        >
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-xl text-green-500"
              onClick={() => navigate(-1)}
              type="button"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-center dark:text-purple-500 md:text-4xl text-2xl font-bold font-inter">
              Add New Lecture
            </h1>
          </header>

          {/* FILES */}
          <div className="flex md:flex-row flex-col gap-5 w-full">
            {/* VIDEO */}
            <div className="w-full">
              <p className="mb-1 text-sm font-semibold">Lecture Video</p>
              <div
                className="border border-gray-300 h-[200px] flex justify-center items-center cursor-pointer"
                onClick={() => videoRef.current.click()}
              >
                {userInput.videoSrc ? (
                  <video
                    src={userInput.videoSrc}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p>Click to upload video</p>
                )}
              </div>
              <input
                type="file"
                accept="video/*"
                ref={videoRef}
                className="hidden"
                onChange={handleVideoChange}
              />
            </div>

            {/* PDF */}
            <div className="w-full">
              <p className="mb-1 text-sm font-semibold">Lecture Notes (PDF)</p>
              <div
                className="border border-gray-300 h-[200px] flex justify-center items-center cursor-pointer"
                onClick={() => pdfRef.current.click()}
              >
                {userInput.pdfSrc ? (
                  <iframe
                    src={userInput.pdfSrc}
                    className="w-full h-full"
                    title="PDF Preview"
                  />
                ) : (
                  <p>Click to upload PDF</p>
                )}
              </div>
              <input
                type="file"
                accept="application/pdf"
                ref={pdfRef}
                className="hidden"
                onChange={handlePDFChange}
              />
            </div>
          </div>

          {/* TEXT FIELDS */}
          <InputBox
            label="Lecture Title"
            name="title"
            placeholder="Enter Lecture Title"
            value={userInput.title}
            onChange={handleInputChange}
          />
          <TextArea
            label="Lecture Description"
            name="description"
            placeholder="Enter Description"
            rows={5}
            value={userInput.description}
            onChange={handleInputChange}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-400"
          >
            {isLoading ? "Uploading..." : "Add Lecture"}
          </button>
        </form>
      </section>
    </Layout>
  );
}
