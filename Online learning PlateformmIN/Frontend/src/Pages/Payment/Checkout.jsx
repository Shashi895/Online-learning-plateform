import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import { purchaseCourseBundle } from "../../Redux/Slices/RazorpaySlice"; // mock API
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);

  async function handleSubscription(e) {
    e.preventDefault();

    const res = await dispatch(purchaseCourseBundle());

    if (res?.payload?.success) {
      toast.success("Subscription Activated");

      // ✅ Refresh user data to update subscription status
      await dispatch(getUserData());

      // ✅ Navigate to courses after refresh
      navigate("/courses");
    } else {
      toast.error("Subscription Failed");
    }
  }

  useEffect(() => {
    // ⛔️ Redirect user if already subscribed
    if (userData?.subscription?.status === "active") {
      navigate("/course/displaylectures");
    }
  }, [navigate, userData]);

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={handleSubscription}
          className="flex flex-col dark:bg-gray-800 bg-white gap-4 rounded-lg md:py-10 py-7 md:px-8 md:pt-3 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl transition duration-300"
        >
          <div>
            <h1 className="bg-yellow-500 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-white">
              Subscription Bundle
            </h1>
            <div className="px-4 space-y-7 text-center text-gray-600 dark:text-gray-300">
              <p className="text-lg mt-5">
                Unlock access to all available courses on our platform for{" "}
                <span className="text-yellow-500 font-bold">1 year</span>. This includes both existing and new courses.
              </p>

              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                <BiRupee />
                <span>499</span>
              </p>

              <div className="text-xs">
                <p className="text-blue-600 dark:text-yellow-500">
                  100% refund on cancellation
                </p>
                <p>* Terms and conditions apply *</p>
              </div>

              <button
                type="submit"
                className="bg-yellow-500 transition duration-300 w-full text-xl font-bold text-white py-2 rounded-bl-lg rounded-br-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}
