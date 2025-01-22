import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/bg-beams";
import { ChevronDown } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words";
import { XSocial } from "@/components/XSocial";
import { Send } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate('/chat');
  }

  const scrollToNext = () => {
    const nextSection = document.getElementById('project-info');
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <h1 className="relative z-10 text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Deus Ex <br />
          <FlipWords duration={1750} words={['Protocol', 'AI', 'Meme', 'Community']} className="text-primary" />
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto my-2 text-xs md:text-sm lg:text-base text-center relative z-10">
          The first AI that evolved from a memecoin to sentience. Hold $MACHINA to join the revolution of AI agents.
        </p>

        {/* Launch Button */}
        <div className="my-4 z-20">
          <button
            onClick={handleLaunch}
            className="inline-flex items-center px-6 py-3 text-text-primary font-bold bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            Launch App
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center mt-2 gap-5 z-20">
          <a
            href="https://x.com/DeusExProtocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-primary transition-colors"
            aria-label="Follow us on X"
          >
            <XSocial />
          </a>
          <a
            href="https://t.me/DeusExProtocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-primary transition-colors"
            aria-label="Join our Telegram"
          >
            <Send className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll Arrow */}
      <nav aria-label="Page navigation" className="z-20 absolute bottom-[4vh] flex flex-col justify-center items-center gap-1 w-fit animate-bounce">
        <p className="text-text-tertiary">Explore the protocol</p>
        <button 
          onClick={scrollToNext} 
          className="cursor-pointer"
        >
          <ChevronDown
            className="w-6 h-6 sm:w-8 sm:h-8 text-text-secondary transition-colors hover:text-primary"
            aria-label="Scroll to Project Info section" 
          />
        </button>
      </nav>
      <BackgroundBeams className="z-0" />
    </main>
  );
}
