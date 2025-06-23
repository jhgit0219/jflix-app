"use client";
import { Play, Info } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[75vh] bg-surface text-foreground overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-black/50 bg-cover bg-center"
        style={{ backgroundImage: 'url("/placeholder.jpg")' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 pl-6 md:pl-16 space-y-4 max-w-xl">
        <h1 className="text-featured-heading">Featured Movie Title</h1>
        <p className="text-body max-w-xl">
          This is a brief description of the featured movie. Add engaging
          content here to entice users to watch.
        </p>
        <div className="flex gap-4 mt-4">
          <button className="bg-primary text-lg px-6 py-2 rounded font-semibold flex items-center gap-2">
            <Play className="w-8 h-8" />
            Play
          </button>
          <button className="bg-surface border border-muted text-lg px-6 py-2 rounded text-foreground flex items-center gap-2">
            <Info className="w-8 h-8" />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}
