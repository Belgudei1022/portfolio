"use client";
import React, { useEffect, useRef, useState } from "react";

const projectsData = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with modern UI/UX, payment integration, and admin dashboard",
    tech: "React, Node.js, MongoDB, Stripe",
    image: "/project1.jpg",
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "Interactive portfolio with 3D animations, smooth transitions, and responsive design",
    tech: "Next.js, Three.js, Framer Motion, Tailwind CSS",
    image: "/project2.jpg",
    link: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates, drag-and-drop, and team features",
    tech: "React, Socket.io, PostgreSQL, Redis",
    image: "/project3.jpg",
    link: "#",
    github: "#",
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time chat application with AI-powered responses and natural language processing",
    tech: "Next.js, OpenAI API, WebSocket, Prisma",
    image: "/project4.jpg",
    link: "#",
    github: "#",
  },
  {
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with location-based forecasts and interactive maps",
    tech: "React, Weather API, Chart.js, Geolocation",
    image: "/project5.jpg",
    link: "#",
    github: "#",
  },
  {
    title: "Social Media Clone",
    description:
      "Full-featured social media platform with posts, comments, likes, and user profiles",
    tech: "React, Node.js, MongoDB, AWS S3",
    image: "/project6.jpg",
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}>
          Featured Projects
        </h2>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              className={`group p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{
                animationDelay: isVisible ? `${0.4 + index * 0.1}s` : "0s",
                transitionDelay: isVisible ? `${0.4 + index * 0.1}s` : "0s",
              }}>
              <div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl opacity-50">
                  📱
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>

              <p className="text-purple-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {project.tech}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Live Demo
                </button>
                <button className="px-3 sm:px-4 py-2 border border-white/20 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  GitHub
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 sm:mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
}
