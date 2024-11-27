import { Outlet } from "react-router-dom";
import Footer from "./partials/Footer";
import Header from "./partials/Header";

export default function FrontendLayout() {
  return (
    <>
      <body className="bg-[#F5F3FF] min-h-screen">
        <div className="container mx-auto py-3">
          <Header />
          <Outlet />
         
        </div>
        <Footer />
      </body>
    </>
  );
}
