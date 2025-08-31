"use client";
import React, { useEffect, useState } from "react";
import SplitText from "../text/SplitText";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cool Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-70"></div>

        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${
              mousePosition.y * 0.1
            }px)`,
          }}></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 0.1}px, ${
              -mousePosition.y * 0.1
            }px)`,
          }}></div>
      </div>

      <div className="relative z-10">
        <div className="mb-8 animate-fade-in">
          <SplitText
            text="Hi, I'm Belgudei"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white mb-4 sm:mb-6"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag="h1"
          />

          <div className="animate-fade-in-up delay-500">
            <SplitText
              text="Your FullStack Developer"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-center text-gray-300 mb-6 sm:mb-8"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="h2"
            />
          </div>
        </div>

        {/* <div className="max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in-up delay-800">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed px-4">
            I specialize in creating modern, responsive web applications with
            cutting-edge technologies. From concept to deployment, I bring your
            ideas to life with clean code and beautiful design.
          </p>
        </div> */}
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in delay-1500">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs sm:text-sm mb-2">Scroll Down</span>
          <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-0.5 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
