import Navbar from "@/components/Navbar/Navbar";

import Footer from "@/components/Footer/Footer";

export default function layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
