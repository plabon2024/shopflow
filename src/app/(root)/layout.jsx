import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";
export default function layout({ children }) {
  return (
    <div className="h-screen">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
