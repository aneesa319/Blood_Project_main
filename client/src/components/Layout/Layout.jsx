import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ui/ScrollToTop";
import Chatbot from "../Chatbot/Chatbot";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 relative">
      <Header />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </div>
  );
}

export default Layout;
