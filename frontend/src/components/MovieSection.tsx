"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const placeholderMovies = new Array(10).fill(null).map((_, i) => ({
  title: `Movie ${i + 1}`,
  image: "/placeholder.jpg",
}));

export default function MovieSection({ title }: { title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const updateScrollEdges = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setAtStart(scrollLeft <= 0);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollEdges(); // initial check
    el.addEventListener("scroll", updateScrollEdges);
    return () => el.removeEventListener("scroll", updateScrollEdges);
  }, []);

  return (
    <section
      className="section space-y-4 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-category-heading">{title}</h2>
      <div className="relative">
        {/* Arrow Buttons */}
        {isHovered && !atStart && (
          <div
            className="absolute left-0 top-0 h-full w-12 bg-black/40 flex items-center justify-center z-10 hover:bg-black/60 transition"
            onClick={() => scroll(-300)}
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </div>
        )}

        {isHovered && !atEnd && (
          <div
            className="absolute right-0 top-0 h-full w-12 bg-black/40 flex items-center justify-center z-10 hover:bg-black/60 transition"
            onClick={() => scroll(300)}
          >
            <ChevronRight className="text-white w-6 h-6" />
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth px-1"
        >
          {placeholderMovies.map((movie, index) => (
            <MovieCard key={index} title={movie.title} image={movie.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
