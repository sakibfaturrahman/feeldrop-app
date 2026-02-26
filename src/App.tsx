import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import { MessageMarqueeSection as MessageLoop } from "@/components/home/messageLoop";
import Features from "@/components/home/features";
import BrowseMessages from "@/components/menfess/browseMessages";
import DetailMenfess from "@/components/menfess/detailMenfess";
import SubmitMessage from "@/components/menfess/submitMessage";

// --- HELPER: SCROLL TO TOP ---
// Mengatur agar setiap perpindahan route, scroll otomatis kembali ke atas
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- PAGE: HOME ---
const HomePage = () => (
  <>
    <Hero />
    <MessageLoop />
    <Features />
  </>
);

// --- COMPONENT: MAIN APP ---
function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Container utama dengan min-h-screen untuk menjaga posisi Footer di Redmibook kamu */}
      <div className="relative min-h-screen flex flex-col bg-white antialiased">
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow pt-12">
          {" "}
          {/* pt-16 agar konten tidak tertutup navbar fixed */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse-message" element={<BrowseMessages />} />
            <Route path="/message" element={<SubmitMessage />} />
            <Route path="/menfess/:id" element={<DetailMenfess />} />

            {/* Fallback jika route tidak ditemukan */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
