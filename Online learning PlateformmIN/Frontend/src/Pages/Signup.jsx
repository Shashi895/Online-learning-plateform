import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const createNewAccount = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = signupData;

    if (!fullName || !email || !password) {
      return toast.error("Please fill all required fields.");
    }

    if (fullName.length < 3) {
      return toast.error("Name must be at least 3 characters long.");
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return toast.error("Invalid email format.");
    }

    const formData = new FormData();
    Object.entries(signupData).forEach(([key, value]) =>
      formData.append(key, value)
    );

    setIsLoading(true);
    const res = await dispatch(createAccount(formData));
    setIsLoading(false);

    if (res?.payload?.success) {
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  return (
    <Layout>
      <section className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
        <form
          onSubmit={createNewAccount}
          className="w-full max-w-md p-5 rounded-xl bg-white dark:bg-gray-800 shadow-xl space-y-4"
        >
          <h2 className="text-center text-2xl font-semibold text-yellow-500 dark:text-yellow-400">
            Create an Account
          </h2>

          <InputBox
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter name"
            value={signupData.fullName}
            onChange={handleUserInput}
            className="text-sm"
          />

          <InputBox
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={signupData.email}
            onChange={handleUserInput}
            className="text-sm"
          />

          {/* Password with Show/Hide */}
          <div className="relative">
            <InputBox
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={signupData.password}
              onChange={handleUserInput}
              className="text-sm pr-10"
            />
            <span
              className="absolute right-3 top-[38px] text-xl cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-700 hover:bg-yellow-400 text-white font-medium py-2 rounded-md transition-all duration-300 text-sm disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-yellow-400 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
