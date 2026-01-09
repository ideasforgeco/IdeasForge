import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About";
import BookCall from "./components/sections/BookCall";
import FAQ from "./components/sections/FAQ";
import Hero from "./components/sections/Hero";
import Process from "./components/sections/Process";
import Projects from "./components/sections/Projects";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import BackToTop from "./components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <FAQ />
        <BookCall />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}