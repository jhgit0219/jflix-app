import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MovieSection from "@/components/MovieSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <MovieSection title="Trending Now" />
      <MovieSection title="Top Rated" />
      <MovieSection title="Action Movies" />
      <MovieSection title="Comedies" />
    </div>
  );
}
