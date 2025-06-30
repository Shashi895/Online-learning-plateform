import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


export default function Layout({ children, hideBar, hideNav, hideFooter }) {
  return (
    <>
      <main className="min-h-[100vh] bg-white dark:bg-base-200">
        {/* navbar */}
        {!hideNav && <Navbar />}

      

        {/* main content */}
        {children}

        {/* footer */}
        {!hideFooter && <Footer />}
      </main>
    </>
  );
}
