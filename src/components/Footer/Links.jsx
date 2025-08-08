import React from "react";

const Links = () => {
  return (
    <footer className="py-28 grid grid-cols-1 md:grid-cols-4 gap-20 mt-12 text-sm">
      {/* Logo & Description */}
      <div className="col-span-1 md:col-span-2 max-w-lg">
        <img
          src="/images/legiguard.png"
          alt="SalesRank.AI"
          className="h-20 w-auto"
        />

        <p className="text-foundationBlue400 text-sm leading-6 my-8">
        LegiGuard delivers AI-powered solutions that make running your business easier, faster, and more secure. From automated compliance and audit readiness to intelligent code reviews, database optimization, and real-time operational insights, we equip teams with the tools they need to work smarter, reduce manual effort, and scale with confidence.
        </p>

        <div className="flex gap-3">
          <div className="w-[34px] h-[34px] rounded-full bg-white  flex items-center justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src="/SVG/facebook.svg" alt="SalesRank.AI" />
            </a>
          </div>

          <div className="w-[34px] h-[34px] rounded-full bg-white  flex items-center justify-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img src="/SVG/twitter.svg" alt="SalesRank.AI" />
            </a>
          </div>

          <div className="w-[34px] h-[34px] rounded-full bg-white  flex items-center justify-center">
            <a
              href="https://linkedIn.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src="/SVG/linkedin.svg" alt="SalesRank.AI" />
            </a>
          </div>

          <div className="w-[34px] h-[34px] rounded-full bg-white  flex items-center justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/SVG/instagram.svg" alt="SalesRank.AI" />
            </a>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-row col-span-1 md:col-span-2 justify-between">
        {/* Navigation */}
        <div>
          <h4 className="text-foundationBlue  text-lg  font-semibold mb-9">
            Navigation
          </h4>
          <ul className="space-y-5 text-foundationBlue400 text-sm">
            <li>Service</li>
            <li>Agency</li>
            <li>Case Study</li>
            <li>Resource</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Licence */}
        <div>
          <h4 className="text-foundationBlue  text-lg  font-semibold mb-9">
            Licence
          </h4>
          <ul className="space-y-5 text-foundationBlue400 text-sm">
            <li>Privacy Policy</li>
            <li>Copyright</li>
            <li>Email Address</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-foundationBlue text-lg font-semibold mb-9">
            Contact
          </h4>
          <ul className="space-y-5 text-foundationBlue400 text-sm">
            <li className="flex items-center gap-2">
              <img src="/SVG/phone.svg" alt="SalesRank.AI" /> (406) 555-0120
            </li>
            <li className="flex items-center gap-2">
              <img src="/SVG/email.svg" alt="SalesRank.AI" /> hey@boostcm.com
            </li>
            <li className="flex items-start ml-1.5 gap-2">
              <img src="/SVG/location.svg" alt="SalesRank.AI" /> 2972 Westheimer
              Rd. Santa Ana, <br /> Illinois 85486
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Links;
