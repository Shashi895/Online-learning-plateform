import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { login } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    setIsLoading(true);

    const response = await dispatch(login(loginData));

    if (response?.payload?.success) {
      setLoginData({ email: "", password: "" });
      navigate("/");
    }

    setIsLoading(false);
  }

  return (
    <Layout>
      <section className="flex justify-center items-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
        <form
          onSubmit={onLogin}
          autoComplete="off"
          noValidate
          className="w-full max-w-md bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-6 flex flex-col gap-5"
        >
          <h2 className="text-center text-2xl md:text-2xl font-semibold dark:text- bg-text-yellow-400 text-yellow-500">
            Login
          </h2>

          <InputBox
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter your email"}
            onChange={handleUserInput}
            value={loginData.email}
            labelStyle="text-sm"
            inputStyle="text-sm"
            
          />

          <InputBox
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter your password"}
            onChange={handleUserInput}
            value={loginData.password}
            labelStyle="text-sm"
            inputStyle="text-sm"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg- bg-gray-500 hover:bg-yellow-400 text-white text-sm py-2 rounded-md transition duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-slate-300">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
