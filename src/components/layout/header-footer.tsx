import { ArrowRight, MessageSquare, Download, Plug, Terminal, Github, ExternalLink, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from "../ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl' : 'bg-transparent'
      } border-b border-zinc-800/50`}>
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="relative w-8 h-8">
                <Image
                  src="/img/vatacars-logo-sm-dark.png"
                  alt="vatACARS Logo"
                  fill
                  priority
                  className="object-contain hover:opacity-80 transition-opacity"
                />
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                  Features
                </Button>
                <Link href="/docs" legacyBehavior>
                  <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                    Documentation
                  </Button>
                </Link>
                <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                  Support
                </Button>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Sign in with VATSIM
              </Button>
            </div>

            <Button 
              variant="ghost"
              className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
  
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="w-full text-left text-zinc-400 hover:text-white hover:bg-zinc-800">
                  Features
                </Button>
                <Link href="/docs" legacyBehavior>
                  <Button variant="ghost" className="w-full text-left text-zinc-400 hover:text-white hover:bg-zinc-800">
                    Documentation
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full text-left text-zinc-400 hover:text-white hover:bg-zinc-800">
                  Support
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                  Sign in with VATSIM
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
};

  export const Footer = () => {
    return (
      <footer className="bg-zinc-950 border-t border-zinc-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {/* Main Content */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              {/* Logo and Links */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex items-center gap-3">
                  <Image
                    src="/img/vatacars-logo-sm-dark.png"
                    alt="vatACARS Logo"
                    width={24}
                    height={24}
                    className="relative"
                  />
                  <span className="text-zinc-100 font-medium">vatACARS</span>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                    Features
                  </Button>
                  <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                    Documentation
                  </Button>
                  <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                    Support
                  </Button>
                  <Button variant="link" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto">
                    GitHub
                  </Button>
                </div>
              </div>
  
              {/* Social Icons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8 border-zinc-600 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-600 hover:border-zinc-700 transition-all"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-zinc-600 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-600 hover:border-zinc-700 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
  
            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-800/50">
              <p className="text-sm text-zinc-500">© 2024 vatACARS Team</p>
              <div className="flex gap-4 text-sm">
                <Button variant="link" className="text-zinc-400 hover:text-zinc-100 h-auto p-0">
                  Privacy
                </Button>
                <Button variant="link" className="text-zinc-400 hover:text-zinc-100 h-auto p-0">
                  Terms
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };