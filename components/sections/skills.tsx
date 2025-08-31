"use client";
import React, { useEffect, useRef, useState } from "react";

const skillsData = [
  {
    id: 1,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Node.js",
      "Python",
      "MongoDB",
      "MySQL",
      "Git",
      "GitHub",
    ],
  },
];

export default function Skills() {
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
      id="skills"
      className="flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}>
          Skills & Technologies
        </h2>

        <div
          className={`space-y-8 sm:space-y-12 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          {skillsData.map((skills, categoryIndex) => (
            <div key={skills.id} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {skills.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className={`p-3 sm:p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
                      isVisible
                        ? "animate-fade-in-up"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      animationDelay: isVisible
                        ? `${0.5 + skillIndex * 0.1}s`
                        : "0s",
                      transitionDelay: isVisible
                        ? `${0.5 + skillIndex * 0.1}s`
                        : "0s",
                    }}>
                      
                    <h4 className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                      {skill}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
