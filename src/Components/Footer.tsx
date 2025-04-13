import React from "react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: "fa-facebook",
    hover: "hover:text-blue-600",
    link: "https://www.facebook.com/people/ZED-Foundation/100067395920505/?mibextid=LQQJ4d",
  },
  {
    icon: "fa-youtube",
    hover: "hover:text-blue-500",
    link: "https://www.youtube.com/channel/UCYzWps_9sLJHPYhsor_9x4A?app=desktop",
  },
  {
    icon: "fa-instagram",
    hover: "hover:text-pink-500",
    link: "https://www.instagram.com/zedfoundation?igsh=MWNseGdoYWJ2MW8zbg%3D%3D&utm_source=qr",
  },
];

const quickLinks = ["Home", "Projects"];

const resources = [
  "Sustainability Guide",
  "Project Verification",
  "FAQs",
  "Support Center",
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info & Social Links */}
          <div>
            <div className="flex items-center mb-6">
              <i className="fas fa-globe-americas text-green-400 text-2xl mr-2"></i>
              <span className="text-2xl font-bold">CarbonFix</span>
            </div>
            <p className="text-gray-400 mb-6">
              Join us in our mission to create a sustainable future through
              innovative carbon compensation solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`text-gray-400 transition-colors duration-300 text-xl ${social.hover}`}
                >
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* Resources */}
          <FooterColumn title="Resources" links={resources} />

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Connect with carbonfix and stay tuned with the latest updates on
              environmental initiatives.
            </p>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Contact Us</h4>
              <p className="text-gray-400 text-sm">
                <i className="fas fa-envelope mr-2"></i>
                <a
                  href="mailto:ZedAid.org@gmail.com"
                  className="text-gray-400 hover:text-gray-500"
                >
                  ZedAid.org@gmail.com
                </a>
              </p>
              <p className="text-gray-400 text-sm mt-2">
                <i className="fas fa-phone mr-2"></i>
                <a
                  href="tel:+91 72087 01981"
                  className="text-gray-400 hover:text-gray-500"
                >
                  +91 72087 01981
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} CarbonFix. All rights reserved.
                        </div> */}
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer Column Component
const FooterColumn: React.FC<{ title: string; links: string[] }> = ({
  title,
  links,
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-6">{title}</h3>
    <ul className="space-y-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.toLowerCase() === "home" ? "/" : "/project"}
            className="text-gray-400 hover:text-green-400 transition-colors duration-300"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
