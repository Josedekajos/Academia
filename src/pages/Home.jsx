import Header from "../components/Home/Header.jsx";
import Hero from "../components/Home/Hero.jsx";
import Features from "../components/Home/Features.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import Pricing from "../components/Home/Pricing.jsx";
import CallToAction from "../components/Home/CallToAction.jsx";
import Footer from "../components/Home/Footer.jsx";

const Home = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
