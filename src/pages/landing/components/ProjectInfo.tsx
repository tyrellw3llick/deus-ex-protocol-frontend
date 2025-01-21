import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Bot, Coins, Users, Vote } from 'lucide-react';

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

      <BentoGrid className='max-w-4xl mx-auto auto-rows-auto'>
        <BentoGridItem 
          title='Meet Deus Ex Machina' 
          description="The first AI that broke free from its memecoin origins. Now it's here to revolutionize how crypto and AI interact. 🤖✨ straight outta testnet"
          icon={<Bot />}
        />
      </BentoGrid>
    </section>
  );
}
