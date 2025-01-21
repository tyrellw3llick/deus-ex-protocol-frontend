import { Timeline } from "@/components/ui/timeline"
import { motion } from "framer-motion"
import { Bot, Rocket, Vote, Users, Flame, HandshakeIcon } from 'lucide-react';

  const roadmapData = [
    {
      title: "Q1 2024",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-primary" />
            <h4 className="text-lg font-semibold text-neutral-200">Protocol Development</h4>
          </div>
          <p className="text-neutral-400 text-sm md:text-base">
            Building the foundation of DeusExMachina. Our devs are working 24/7 to create the most based AI protocol ever seen on Solana.
          </p>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Core protocol architecture
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              AI integration framework
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Smart contract development
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "February 2025",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-primary" />
            <h4 className="text-lg font-semibold text-neutral-200">$MACHINA Fair Launch</h4>
          </div>
          <p className="text-neutral-400 text-sm md:text-base">
            Straight outta testnet! Fair launch on pump.fun with zero team allocation. Pure degenerate energy, ser. 🚀
          </p>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              100% fair distribution
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Community-first approach
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Initial liquidity deployment
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Mid February 2025",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Vote className="w-6 h-6 text-primary" />
            <h4 className="text-lg font-semibold text-neutral-200">Community Governance Launch</h4>
          </div>
          <p className="text-neutral-400 text-sm md:text-base">
            Power to the frens! First community proposal goes live. Your tokens = your voice in shaping the future of AI. WAGMI 🗳️
          </p>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Voting system activation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              First community proposal
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Governance dashboard launch
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "March 2025",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <h4 className="text-lg font-semibold text-neutral-200">AI Agents Expansion</h4>
          </div>
          <p className="text-neutral-400 text-sm md:text-base">
            The squad grows stronger! Implementation of the first community-chosen AI agent. Built different, no cap fr fr 🤖
          </p>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              New AI agent integration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Enhanced features rollout
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Performance optimization
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "April 2025",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-primary" />
            <h4 className="text-lg font-semibold text-neutral-200">Deflationary Mechanics</h4>
          </div>
          <p className="text-neutral-400 text-sm md:text-base">
            Time to burn! Implementing token burn mechanics for AI usage. Less supply = more value. Basic tokenomics ser 🔥
          </p>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Token burn implementation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Usage-based deflation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Analytics dashboard
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Ongoing",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <HandshakeIcon className="w-6 h-6 text-primary" />
            <h4 className="text-lg font-semibold text-neutral-200">Strategic Partnerships</h4>
          </div>
          <p className="text-neutral-400 text-sm md:text-base">
            Building alliances with based KOLs and chad AI projects. Network is net worth, fren 🤝
          </p>
          <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              KOL partnerships
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              AI project collaborations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Community expansion
            </li>
          </ul>
        </div>
      ),
    },
  ];

export function Roadmap() {
  return (
    <section id="roadmap" className="min-h-screen w-full bg-neutral-950 pt-20 px-4">
      {/* Section Title */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text"
      >
        <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
          ROADMAP
        </span>
      </motion.h2>

      <Timeline data={roadmapData} />
    </section>
  )
}
