import React, { useState, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';
export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully!', {
        description: "We'll get back to you as soon as possible."
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-4xl md:text-5xl font-serif font-bold text-espresso mb-4">
            
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.2
            }}
            className="text-coffee max-w-2xl mx-auto">
            
            Have a question or just want to say hi? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info & Map */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="space-y-10">
            
            <div>
              <h2 className="text-2xl font-serif font-semibold text-espresso mb-6">
                Visit Our Shop
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-medium text-espresso mb-1">Address</h3>
                    <p className="text-coffee/80">
                      Bolonia Street, Telaje
                      <br />
                      Tandag City, Surigao del Sur, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-medium text-espresso mb-1">Phone</h3>
                    <p className="text-coffee/80">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-medium text-espresso mb-1">Email</h3>
                    <p className="text-coffee/80">hello@brewhaven.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-beige aspect-video shadow-sm bg-cream">
              <iframe
                title="Brew Haven location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=126.1886%2C9.0686%2C126.2086%2C9.0886&layer=mapnik&marker=9.0786%2C126.1986"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
              
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=9.0786&mlon=126.1986#map=16/9.0786/126.1986"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-coffee hover:text-espresso transition-colors -mt-6">
              
              <MapPin className="w-4 h-4" />
              View larger map
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-beige/50">
            
            <h2 className="text-2xl font-serif font-semibold text-espresso mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-espresso mb-2">
                  
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cream-light border border-beige focus:outline-none focus:ring-2 focus:ring-coffee/50 transition-shadow"
                  placeholder="John Doe" />
                
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-espresso mb-2">
                  
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cream-light border border-beige focus:outline-none focus:ring-2 focus:ring-coffee/50 transition-shadow"
                  placeholder="john@example.com" />
                
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-espresso mb-2">
                  
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-cream-light border border-beige focus:outline-none focus:ring-2 focus:ring-coffee/50 transition-shadow resize-none"
                  placeholder="How can we help you?">
                </textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-espresso text-cream rounded-xl font-medium hover:bg-coffee transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                
                {isSubmitting ?
                <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" /> :

                <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>);

}