import React from "react";
import { Globe, Mail, Briefcase, Users } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">JobPortal</h3>
            <p className="text-gray-400 text-sm mb-4">
              Find your dream job and grow your career with us.
            </p>
            <div className="flex gap-4">
              <Globe className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
              <Mail className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <Briefcase className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
              <Users className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-white transition">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/companies" className="hover:text-white transition">
                  Companies
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/signup" className="hover:text-white transition">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-white transition">
                  Search Jobs
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:text-white transition">
                  My Profile
                </a>
              </li>
              <li>
                <a href="/applications" className="hover:text-white transition">
                  My Applications
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/post-job" className="hover:text-white transition">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="/company" className="hover:text-white transition">
                  Company Profile
                </a>
              </li>
              <li>
                <a href="/candidates" className="hover:text-white transition">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
