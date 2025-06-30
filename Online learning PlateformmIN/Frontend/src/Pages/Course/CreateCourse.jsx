import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";
import InputBox from "../../Components/InputBox/InputBox";
import TextArea from "../../Components/InputBox/TextArea";

export default function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  // Predefined categories for dropdown
  const courseCategories = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "AI & ML",
    "Cybersecurity",
    "Blockchain",
    "Design",
    "Business",
    "Other",
  ];

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are required!");
      return;
    }

    setIsCreatingCourse(true);
    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("category", userInput.category);
    formData.append("createdBy", userInput.createdBy);
    formData.append("thumbnail", userInput.thumbnail);

    const response = await dispatch(createNewCourse(formData));
    if (response?.payload?.success) {
      toast.success("Course created successfully!");
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/"); // or wherever you want
    }
    setIsCreatingCourse(false);
  }

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh] bg-slate-100 dark:bg-gray-800">
        <form
          onSubmit={onFormSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col bg-slate-100 dark:bg-gray-600 gap-7 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[750px] w-full shadow-custom dark:shadow-xl"
        >
          <h1 className="text-center dark:text-purple-500 text-3xl font-bold font-inter">
            Create New Course
          </h1>

          <div className="w-full flex md:flex-row md:justify-between justify-center flex-col md:gap-0 gap-5 text-xs rounded-xl">
            <div className="md:w-[48%] w-full flex flex-col gap-5 text-xs">
              {/* Thumbnail Upload */}
              <div className="border border-gray-300 text-xs rounded-xl">
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 object-cover rounded-md"
                      src={userInput.previewImage}
                      alt="Thumbnail Preview"
                    />
                  ) : (
                    <div className="w-full h-44 flex items-center justify-center text-center">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Course Title */}
              <InputBox
                label="Title"
                name="title"
                type="text"
                placeholder="Enter Course Title"
                onChange={handleUserInput}
                value={userInput.title}
              />
            </div>

            <div className="md:w-[48%] w-full flex flex-col gap-5 rounded-xl">
              {/* Instructor Name */}
              <InputBox
                label="Instructor"
                name="createdBy"
                type="text"
                placeholder="Enter Instructor Name"
                onChange={handleUserInput}
                value={userInput.createdBy}
              />

              {/* Category Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-white">
                  Category
                </label>
                <select
                  name="category"
                  value={userInput.category}
                  onChange={handleUserInput}
                  className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
                >
                  <option value="">Select a category</option>
                  {courseCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <TextArea
                label="Description"
                name="description"
                rows={3}
                type="text"
                placeholder="Enter Course Description"
                onChange={handleUserInput}
                value={userInput.description}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCreatingCourse}
            className="mt-3 bg-yellow-500 text-white transition-all ease-in-out duration-300 rounded-md py-2 font-medium text-lg cursor-pointer disabled:opacity-60"
          >
            {isCreatingCourse ? "Creating Course..." : "Create Course"}
          </button>
        </form>
      </section>
    </Layout>
  );
}
