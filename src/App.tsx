import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import { MessageMarqueeSection as MessageLoop } from "@/components/home/messageLoop";
import Features from "@/components/home/features";
import BrowseMessages from "@/components/menfess/browseMessages";
import DetailMenfess from "@/components/menfess/detailMenfess";
import SubmitMessage from "@/components/menfess/submitMessage"; // Import komponen baru

// Halaman Utama: Gabungan Hero, Loop Pesan, dan Fitur
const HomePage = () => {
  return (
    <>
      <Hero />
      <MessageLoop />
      <Features />
    </>
  );
};

function App() {
  return (
    <Router>
      {/* Menggunakan min-screen agar footer selalu di bawah pada laptop Redmibook kamu */}
      <div className="relative min-h-screen flex flex-col bg-white">
        <Navbar />

        {/* Konten Utama dengan Routing Dinamis */}
        <main className="flex-grow pt-16">
          <Routes>
            {/* Halaman Landing */}
            <Route path="/" element={<HomePage />} />

            {/* Halaman Jelajahi Pesan (Browse) */}
            <Route path="/browse-message" element={<BrowseMessages />} />

            {/* Halaman Kirim Pesan (Submit) - Placeholder sudah diganti */}
            <Route path="/message" element={<SubmitMessage />} />

            {/* Halaman Detail Pesan berdasarkan ID dari MongoDB */}
            <Route path="/menfess/:id" element={<DetailMenfess />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
