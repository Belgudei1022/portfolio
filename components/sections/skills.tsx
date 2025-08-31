"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const skillsData = [
  {
    id: 1,
    skills: [
      { skill: "React", icon: "/svg/react.png" },
      { skill: "Next.js", icon: "/svg/nextjs.png" },
      { skill: "TypeScript", icon: "/svg/typescript.png" },
      { skill: "JavaScript", icon: "/svg/javascript.png" },
      { skill: "HTML/CSS", icon: "/svg/html.png" },
      { skill: "Tailwind CSS", icon: "/svg/tailwind.png" },
      { skill: "Node.js", icon: "/svg/node.png" },
      { skill: "Python", icon: "/svg/python.png" },
      { skill: "MongoDB", icon: "/svg/mongodb.png" },
      { skill: "MySQL", icon: "/svg/mysql.png" },
      { skill: "GitHub", icon: "/svg/github.png" },
    ],
  },
];

export default function Skills() {
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
      id="skills"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 ${
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
                    key={skill.skill}
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
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 relative">
                        <Image
                          src={skill.icon}
                          alt={skill.skill}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm lg:text-base text-center">
                        {skill.skill}
                      </h4>
                    </div>
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
