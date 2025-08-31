import Image from "next/image";
import Orb from "@/components/background";
import Nav from "@/components/shared/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[rgba(0,0,0,0.97)] relative overflow-hidden">
      <div className="relative z-10 w-full min-h-screen">
        <Nav />

        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] relative">
              <Orb
                hoverIntensity={0.12}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
              />
            </div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <Hero />
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <About />
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <Skills />
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <Projects />
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <Contact />
        </section>

        {/* <Footer /> */}
      </div>
    </div>
  );
}
