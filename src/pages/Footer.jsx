import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#242424] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
        {/* Left side - Links */}
        <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 text-sm">
          <a href="/about" className="hover:text-white transition">
            About Us
          </a>
          <a href="/services" className="hover:text-white transition">
            Service
          </a>
          <a href="/faq" className="hover:text-white transition">
            FAQ
          </a>
          <a href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition">
            Terms of Service
          </a>
        </nav>

        {/* Right side - Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775a4.958 4.958 0 002.163-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.38 4.482A13.978 13.978 0 011.671 3.149a4.902 4.902 0 001.523 6.574 4.9 4.9 0 01-2.229-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.936 4.936 0 004.6 3.417 9.869 9.869 0 01-6.102 2.105c-.396 0-.787-.023-1.17-.068a13.945 13.945 0 007.548 2.209c9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.015-.634a9.936 9.936 0 002.457-2.548l-.047-.02z" />
            </svg>
          </a>

          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.322v21.355C0 23.407.596 24 1.325 24h11.483v-9.294H9.692v-3.622h3.116V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.404 24 24 23.407 24 22.678V1.322C24 .592 23.404 0 22.675 0z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.025-3.037-1.849-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.635-1.849 3.362-1.849 3.596 0 4.263 2.368 4.263 5.449v6.291zM5.337 7.433a2.07 2.07 0 110-4.139 2.07 2.07 0 010 4.139zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.771 24h20.451C23.207 24 24 23.226 24 22.271V1.728C24 .774 23.207 0 22.225 0z" />
            </svg>
          </a>

          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
