import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Droplets, Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  const linkClass =
    "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm";

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Col 1 - Logo */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Droplets className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold font-heading text-primary-600 dark:text-primary-400">
              LifeSaver System
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Saving lives through smart donor matching. Every drop counts.
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold font-heading text-gray-800 dark:text-white mb-4">
            Quick Links
          </h3>
          <div className="flex flex-col space-y-2">
            <NavLink to="" className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About Us</NavLink>
            <NavLink to="/donation-process" className={linkClass}>Donation Process</NavLink>
            <NavLink to="/eligibility" className={linkClass}>Eligibility</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            <NavLink to="/login" className={linkClass}>Login</NavLink>
            <NavLink to="/registration" className={linkClass}>Register</NavLink>
          </div>
        </div>

        {/* Col 3 - Founders */}
        <div>
          <h3 className="text-lg font-semibold font-heading text-gray-800 dark:text-white mb-4">
            Founders
          </h3>
          <div className="text-sm space-y-3">
            <div>
              <p className="font-semibold dark:text-gray-200">Muhammad Ashiq</p>
              <a href="mailto:muhammadashiq431@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline text-xs break-all">
                muhammadashiq431@gmail.com
              </a>
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200">Aneesa Inayat</p>
              <a href="mailto:aneesainayat22@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline text-xs break-all">
                aneesainayat22@gmail.com
              </a>
            </div>
            <div className="pt-2 border-t border-gray-300 dark:border-gray-600">
              <p className="font-semibold dark:text-gray-200">Support</p>
              <a href="mailto:support@lifesaver.com" className="text-primary-600 dark:text-primary-400 hover:underline text-xs">
                support@lifesaver.com
              </a>
            </div>
          </div>
        </div>

        {/* Col 4 - Newsletter */}
        <div>
          <h3 className="text-lg font-semibold font-heading text-gray-800 dark:text-white mb-4">
            Newsletter
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Stay updated with our latest news and blood donation drives.
          </p>
          <form onSubmit={handleNewsletter} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-r-lg transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-600 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} LifeSaver System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
