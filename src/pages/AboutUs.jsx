import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>About Us</title>
        </Helmet>
      </HelmetProvider>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex flex-col gap-6 w-8/12 mx-auto text-justify py-12">
        <h1 className="font-bold text-4xl text-primary">About Us</h1>
        <p>
          Welcome to <b>Chill Gamer</b>—your cozy corner of the internet for
          honest and engaging video game reviews! Whether you&apos;re a casual
          player, a competitive enthusiast, or someone diving into gaming for
          the first time, we&apos;ve got you covered. Our mission is to provide
          a platform where gamers can share insights, discover new favorites,
          and foster a community centered around the love of gaming.
        </p>
        <p>
          Built with passion and powered by cutting-edge technology,{" "}
          <b>Chill Gamer</b> is a hub for gamers, by gamers.
        </p>
        <hr className="border-1 border-accent" />
        <h1 className="font-bold text-4xl text-secondary">Contact Us</h1>
        <p>
          We&apos;d love to hear from you! Feel free to reach out with your
          questions, suggestions, or just to chat about the latest games.
        </p>
        <ul>
          <li className="flex gap-3 items-center">
            <FaEnvelope /> Email:{" "}
            <a
              className="btn btn-link p-0 text-blue-400"
              href="mailto:jawad.i.mamoon@gmail.com"
            >
              jawad.i.mamoon@gmail.com
            </a>
          </li>
          <li className="flex gap-3 items-center">
            <FaPhone /> Phone:{" "}
            <a
              className="btn btn-link p-0 text-blue-400"
              href="tel:+8801886318799"
            >
              +880 1886-318799
            </a>
          </li>
          <li className="flex gap-3 items-center">
            <FaWhatsapp /> Whatsapp:{" "}
            <a
              className="btn btn-link p-0 text-blue-400"
              href="https://wa.me/8801886318799"
            >
              +880 1886-318799
            </a>
          </li>
        </ul>
        <p>
          Join the conversation and be part of our vibrant gaming community!
        </p>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
