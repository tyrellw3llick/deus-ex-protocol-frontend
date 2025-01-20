"use client";
import { BackgroundBeams } from "@/components/ui/bg-beams";
import { ChevronDown } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words";

export function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('how-it-works');
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="relative z-10 text-5xl hd:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Deus Ex <br />
          <FlipWords duration={1750} words={['Protocol', 'AI', 'Meme', 'Community']} className="text-primary" />
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto my-2 text-xs md:text-sm lg:text-base text-center relative z-10">
          The first protocol that gives the community the power to use and create AI coins
        </p>
      </div>

      {/* Scroll Arrow */}
      <p className="text-text-tertiary absolute bottom-16 animate-bounce">Explore the protocol</p>
      <button 
        onClick={scrollToNext} 
        className="absolute bottom-8 z-10 cursor-pointer transition-transform hover:translate-y-1"
      >
        <ChevronDown 
          className="w-6 h-6 sm:w-8 sm:h-8 text-text-secondary animate-bounce" 
          aria-label="Scroll to next section" 
        />
      </button>
      <BackgroundBeams />
    </div>
  );
}


