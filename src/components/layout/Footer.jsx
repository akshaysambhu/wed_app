/**
 * Footer.jsx — Global Footer
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#D4C5B9] py-16 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-serif text-2xl font-semibold text-white tracking-tight mb-4 inline-block">
              PLAN MY MOMENTS
            </Link>
            <p className="text-sm text-[#A39081] max-w-xs">
              Discover the people, places and ideas behind your celebration — then build the perfect team to bring it to life.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/vendors" className="hover:text-white transition-colors">Vendors</Link></li>
              <li><Link to="/stories" className="hover:text-white transition-colors">Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <p className="text-sm mb-4 text-[#A39081]">Join our newsletter for inspiration and planning tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#292524] border border-[#44403C] text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:border-[#A39081] text-sm"
              />
              <button className="bg-[#6B3037] hover:bg-[#8E4A49] text-white px-4 py-2 rounded-r-lg transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-[#292524] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} Plan My Moments. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
