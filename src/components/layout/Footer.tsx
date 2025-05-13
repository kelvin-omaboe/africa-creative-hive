
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-crib-midnight text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-display font-bold text-crib-terracotta mb-4">The Crib</h2>
            <p className="text-gray-300 mb-4">
              Africa's digital home for creatives. Connect, showcase, collaborate, and monetize your creative work.
            </p>
            <div className="flex gap-4">
              {/* Social icons would go here */}
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                {/* Icon placeholder */}
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
              </a>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/discover" className="text-gray-300 hover:text-white">Discover</Link>
              </li>
              <li>
                <Link to="/collaborate" className="text-gray-300 hover:text-white">Collaborate</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white">Events</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-300 hover:text-white">Partners</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-6 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} The Crib. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for African Creatives</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
