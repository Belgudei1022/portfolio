"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projectsData = [
  {
    id: 1,
    title: "BichigAI",
    description:
      "AI технологид суурилсан Document Analyzer Web Application-ий гол зорилго нь хэрэглэгчийн оруулсан Файл, Текст, Audio-г  монгол болон англи дээр уншиж, боловсруулан, хураангуйлах болон дүгнэлт гаргадаг. ",
    tech: "Next.js, Node.js, ",
    image: "/projects/BichigAI.png",
    link: "#",
    github: "#",
    category: "AI/ML",
    featured: true,
  },
  {
    id: 2,
    title: "CarRent",
    description:
      "Modern car rental platform with booking system and user management",
    tech: "JavaScript, HTML, CSS",
    image: "/projects/CarRent.png",
    link: "#",
    github: "#",
    category: "Full-Stack",
    featured: false,
  },
  {
    id: 3,
    title: "MovieLand",
    description:
      "Movie discovery and streaming platform with search and recommendation features",
    tech: "React, Firebase, Tailwind CSS",
    image: "/projects/MovieLand.png",
    link: "#",
    github: "#",
    category: "Frontend",
    featured: false,
  },
];

export default function Projects() {
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

  const featuredProject = projectsData.find((project) => project.featured);
  const otherProjects = projectsData.filter((project) => !project.featured);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto w-full">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 sm:mb-20 lg:mb-24 text-center transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}>
          Featured Projects
        </h2>

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          {/* Large Featured Project */}
          <div className="lg:col-span-2">
            {featuredProject && (
              <div className="relative group">
                <div className="relative h-80 sm:h-96 lg:h-[500px] w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl overflow-hidden">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                      {featuredProject.title}
                    </h3>
                    <p className="text-blue-400 font-semibold text-sm sm:text-base mb-2">
                      BUILT WITH{" "}
                      {featuredProject.tech.split(", ")[0].toUpperCase()}
                    </p>
                    <p className="text-white/80 text-sm sm:text-base max-w-md">
                      {featuredProject.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Smaller Project Cards - Mobile Responsive */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:h-full lg:justify-between">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 lg:flex-1 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: isVisible ? `${0.5 + index * 0.1}s` : "0s",
                  transitionDelay: isVisible ? `${0.5 + index * 0.1}s` : "0s",
                }}>
                <div className="relative h-48 sm:h-56 lg:h-full w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

                  {/* Project Title Overlay */}
                  <div className="absolute bottom-3 left-3 z-20 text-white">
                    <h4 className="text-lg sm:text-xl font-semibold mb-1">
                      {project.title}
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {project.tech.split(", ").slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
