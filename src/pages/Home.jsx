
import Header from "../components/Home/Header.jsx";
import Hero from "../components/Home/Hero.jsx";
import Features from "../components/Home/Features.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import Pricing from "../components/Home/Pricing.jsx";
import CallToAction from "../components/Home/CallToAction.jsx";
import Footer from "../components/Home/Footer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user= localStorage.getItem('user');

    if (user && token) {
      navigate('/dashboard');
    }
  }, [navigate]);

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
