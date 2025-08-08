import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <header className="  py-8">
      <div className="max-w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-20">
          <Link to="/">
            <img
              src="/images/legiguard.png"
              alt="LegiGuard.AI"
              className="h-16 w-auto cursor-pointer"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-nav font-semibold font-jakarta">
            <HashLink
              smooth
              to="#home"
              className="hover:font-bold cursor-pointer"
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="#features"
              className="hover:font-bold cursor-pointer"
            >
              Features
            </HashLink>
            <HashLink
              smooth
              to="#how-it-works"
              className="hover:font-bold cursor-pointer"
            >
              How It Works
            </HashLink>
            <HashLink
              smooth
              to="#use-cases"
              className="hover:font-bold cursor-pointer"
            >
              Use Cases
            </HashLink>
            <HashLink
              smooth
              to="#pricing"
              className="hover:font-bold cursor-pointer"
            >
              Pricing
            </HashLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleClick}
            className="bg-white border cursor-pointer border-button text-button px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-button hover:text-white transition duration-200 text-sm sm:text-md font-bold w-fit"
          >
            Get started
          </button>

          {/* Toast */}
          {showToast && (
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-lg transition-opacity duration-300 z-50">
              🚧 Link not ready yet. Still work needs to be done.
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
