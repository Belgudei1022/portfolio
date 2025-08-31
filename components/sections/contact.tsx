"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "/svg/github.png",
    color: "hover:text-gray-400",
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: "/svg/facebook.png",
    color: "hover:text-blue-400",
  },
  {
    name: "Gmail",
    url: "https://gmail.com",
    icon: "/svg/gmail.png",
    color: "hover:text-red-400",
  },
];

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px",
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}>
          Get In Touch
        </h2>

        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 px-4 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          Have some big idea or brand to develop and need help? Then reach out
          we&apos;d love to hear about your project and provide help.
        </p>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 transition-all duration-1000 delay-500 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Send Message
            </h3>
            <form className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 text-sm sm:text-base"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 resize-none text-sm sm:text-base"></textarea>
              <button
                type="submit"
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Follow Me
              </h3>
              <div className="flex justify-center space-x-4 sm:space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl sm:text-3xl transition-all duration-300 hover:scale-110 ${social.color}`}>
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={40}
                      height={40}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
