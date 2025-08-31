"use client";
import React from "react";
import SplitText from "../text/SplitText";

export default function Hero() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
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
