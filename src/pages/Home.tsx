import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import ProductGallery from "../components/home/ProductGallery";
import Testimonials from "../components/home/Testimonials";
import ContactSection from "../components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ProductGallery />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default Home;
