import pumpfunIcon from "@/assets/pumpfun_logo.webp"
import solanaIcon from "@/assets/solana_logo.svg"
import { motion } from 'framer-motion';

export function Tokenomics() {
  return (
    <section id="tokenomics" className="min-h-screen w-full bg-neutral-950 pt-20 px-4">
      {/* Title with rays effect */}
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-2xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 122, 61, 0.15) 0%, transparent 70%)',
          }}
        />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text"
        >
          <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
            TOKENOMICS
          </span>
        </motion.h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Main Info Cards */}
        <div className="grid gap-6">
          {/* Network Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 flex items-center justify-between group hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <img 
                  src={solanaIcon} 
                  alt="Solana Logo" 
                  className="w-6 h-6"
                />
              </div>
              <span className="text-xl font-semibold text-neutral-200">
                SOLANA NETWORK
              </span>
            </div>
            <span className="text-neutral-400 group-hover:text-primary transition-colors">
              SPL Token
            </span>
          </motion.div>

          {/* Launch Platform Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 flex items-center justify-between group hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-xl">
                <img 
                  src={pumpfunIcon} 
                  alt="Solana Logo" 
                  className="w-6 h-6"
                />
              </div>
              <span className="text-xl font-semibold text-neutral-200">
                LAUNCHED ON PUMP.FUN
              </span>
            </div>
            <span className="text-neutral-400 group-hover:text-primary transition-colors">
              Fair Launch
            </span>
          </motion.div>

          {/* Supply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 flex items-center justify-between group hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <span className="text-2xl">🔥</span>
              </div>
              <span className="text-xl font-semibold text-neutral-200">
                TOTAL SUPPLY
              </span>
            </div>
            <span className="text-neutral-400 group-hover:text-primary transition-colors">
              1,000,000,000 $MACHINA
            </span>
          </motion.div>
        </div>

        {/* Fair Launch Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-neutral-200 mb-4">
            100% Fair Launch 🚀
          </h3>
          <ul className="space-y-3 text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              No presale, no team allocations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              All tokens minted through Pump.fun's bonding curve
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              6 decimal precision for accurate pricing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              Transparent and verifiable on-chain
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
