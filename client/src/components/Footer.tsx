import React from 'react';
import { Link } from 'react-router-dom';
import {
  Coffee,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-beige" />
              <span className="font-serif text-xl font-bold tracking-tight text-cream">
                Brew Haven
              </span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Serving freshly brewed coffee made with passion. Your local spot
              for specialty coffee, warm pastries, and good vibes.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-cream/70 hover:text-beige transition-colors">
                
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-cream/70 hover:text-beige transition-colors">
                
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-cream/70 hover:text-beige transition-colors">
                
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-beige">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-cream/70 hover:text-cream transition-colors text-sm">
                  
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-cream/70 hover:text-cream transition-colors text-sm">
                  
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-cream/70 hover:text-cream transition-colors text-sm">
                  
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-cream/70 hover:text-cream transition-colors text-sm">
                  
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-beige">
              Visit Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-cream/70">
                <MapPin className="w-5 h-5 text-beige shrink-0" />
                <span>
                  Bolonia Street, Telaje
                  <br />
                  Tandag City, Surigao del Sur
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/70">
                <Phone className="w-5 h-5 text-beige shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/70">
                <Mail className="w-5 h-5 text-beige shrink-0" />
                <span>hello@brewhaven.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-beige">
              Hours
            </h3>
            <ul className="space-y-2 text-sm text-cream/70">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>7:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>8:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-xs">
            © {new Date().getFullYear()} Brew Haven Coffee Shop. All rights
            reserved.
          </p>
          <p className="text-cream/30 text-xs italic">
            Mini Capstone Project Demo
          </p>
        </div>
      </div>
    </footer>);

}