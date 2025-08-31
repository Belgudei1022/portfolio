"use client";
import React, { useEffect, useRef, useState } from "react";

export default function About() {
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
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}>
          About Me
        </h2>
        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-12 px-4 transition-all duration-1000 delay-300 text-justify ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}>
          Намайг Бэлгүдэй гэдэг. Би &apos;Indra Cyber Institute&apos; сургуулийг
          FullStack Developer мэргэжлээр амжилттай дүүргэсэн. Одоогоор ажлын
          туршлагагүй ч программчлалын чиглэлд гүнзгий сонирхолтой бөгөөд цааш
          улам бүр мэдлэгээ хөгжүүлж дээшлүүлэх сонирхолтой байгаа. &apos;Indra
          Cyber Instute&apos;-д сураад Python, HTML/CSS, Next.js, React.js,
          MySQL зэрэг технологиудыг эзэмшсэн. Би шинэ орчинд хурдан дасан
          зохицож, аливааг түргэн ойлгон өөртөө шингээх чадвартай. Хамт олны
          дунд санаачлагатай оролцож, шийдвэр гаргахдаа нямбай хандахыг
          эрхэмлэдэг бөгөөд тогтвортой, найдвартайгаар ажиллахыг үргэлж
          чухалчилж авж үздэг. Өөрийгөө хөгжүүлж, илүү ихийг сурахад үргэлж
          бэлэн байдаг тул богино хугацаанд чухал ур чадваруудыг бүрэн эзэмшиж,
          бодит үр дүн гаргаж чадна гэдэгтээ итгэлтэй байна.
        </p>
      </div>
    </div>
  );
}
