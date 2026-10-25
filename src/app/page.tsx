import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main>
      <div className="sl-root">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
