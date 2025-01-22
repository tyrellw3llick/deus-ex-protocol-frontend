import { Send } from 'lucide-react';
import { XSocial } from './XSocial';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Brand */}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Deus Ex Protocol
          </h3>

          {/* Tagline */}
          <p className="text-neutral-400 text-sm">
            The first AI come to life as a memecoin
          </p>

          {/* Social Links */}
          <div className="flex space-x-6">
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

          {/* Copyright */}
          <p className="text-sm text-neutral-400">
            © {currentYear} Deus Ex Protocol
          </p>
        </div>
      </div>
    </footer>
  );
}
