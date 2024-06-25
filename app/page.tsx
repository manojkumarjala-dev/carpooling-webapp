import Image from "next/image";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
export default async function Home() {
  return (
   <div className="min-h-screen mt-50">
    <Hero></Hero>
    <div className="p-1 w-full bg-gray-300"></div>
    <Features></Features>
    <div className="p-1 w-full bg-gray-300"></div>
    <Footer></Footer>
   </div>
  );
}
