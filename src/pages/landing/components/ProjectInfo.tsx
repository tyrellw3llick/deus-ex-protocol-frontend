import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Bot, Key, Users, Vote } from 'lucide-react';

const ProjectItems = [
  {
    title: "Meet DeusExMachina",
    description: (
      <div className='space-y-4'>
        <p>The first AI that broke free from its memecoin origins. Now it's here to revolutionize how crypto and AI interact.</p>
        <p>🤖✨ Straight outta testnet</p>
      </div>
    ),
    icon: <Bot className="w-6 h-6 text-primary" />,
    image: "/images/robot_head.jpeg",
    imagePosition: "object-[center_28%]",
    className: "bg-neutral-900/50 border-neutral-800 backdrop-blur-sm",
  },
  {
    title: "Your Key to AI Power",
    description: "Hold $MACHINA tokens to unlock exclusive AI chat access. From Plankton (10 msgs/day) to Whale (200 msgs/day), your rank determines your power level.",
    icon: <Key className="w-6 h-6 text-primary" />,
    image: "/images/crypto_key_16:9.jpeg",
    imagePosition: "object-center",
    className: "md:col-span-2 bg-neutral-900/50 border-neutral-800 backdrop-blur-sm",
  },
  {
    title: "Shape The Future",
    description: "Your tokens = Your voice. Vote on protocol upgrades, new AI agents, and treasury decisions. True decentralized AI governance, fren.",
    icon: <Vote className="w-6 h-6 text-primary" />,
    image: "/images/world_16:9.jpeg",
    imagePosition: "object-center",
    className: "md:col-span-2 bg-neutral-900/50 border-neutral-800 backdrop-blur-sm",
  },
  {
    title: "Join The Revolution",
    description: "Be part of the first community-driven AI protocol. From meme to mainstream, we're creating history together. WAGMI 🤖",
    icon: <Users className="w-6 h-6 text-primary" />,
    image: "/images/community.jpeg",
    imagePosition: "object-center",
    className: "bg-neutral-900/50 border-neutral-800 backdrop-blur-sm",
  },
];

export function ProjectInfo() {
  return (
    <section id="project-info" className="min-h-screen w-full bg-neutral-950 pt-20 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600"
      >
        The Protocol
      </motion.h2>

      <BentoGrid className="mx-auto">
          {ProjectItems.map((item) => (
            <BentoGridItem
              key={item.title}
              title={item.title}
              description={item.description}
              className={`cursor-pointer hover:border-primary group ${item.className}`}
              icon={item.icon}
              header={
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  {/* Placeholder until image loads */}
                  <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
                  
                  {/* Actual image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 ${item.imagePosition}`}
                    loading="lazy"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/90" />
                </div>
              }
            />
          ))}
        </BentoGrid>
    </section>
  );
}
