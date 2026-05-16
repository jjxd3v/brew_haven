import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const featuredCoffees = [
{
  name: 'Signature Espresso',
  description: 'Rich, bold, and perfectly extracted.',
  image:
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Vanilla Latte',
  description: 'Smooth espresso with steamed milk and vanilla.',
  image:
  'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Classic Cappuccino',
  description: 'Equal parts espresso, steamed milk, and foam.',
  image:
  'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Dark Mocha',
  description: 'Espresso combined with rich dark chocolate.',
  image:
  'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800&auto=format&fit=crop'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
export function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
            alt="Coffee shop interior"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-espresso/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="text-5xl md:text-7xl font-serif font-bold text-cream mb-6 leading-tight">
            
            Welcome to <br className="md:hidden" />
            <span className="text-beige">Brew Haven</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: 'easeOut'
            }}
            className="text-lg md:text-2xl text-cream/90 mb-10 font-light max-w-2xl mx-auto">
            
            Serving freshly brewed coffee made with passion, right in the heart
            of the city.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: 'easeOut'
            }}>
            
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-beige text-espresso px-8 py-4 rounded-full font-medium text-lg hover:bg-cream transition-all hover:scale-105 active:scale-95 shadow-lg">
              
              Order Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-espresso mb-4">
              House Favorites
            </h2>
            <p className="text-coffee max-w-2xl mx-auto">
              Discover our most loved specialty drinks, crafted with carefully
              sourced beans and perfect technique.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px'
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {featuredCoffees.map((coffee, index) =>
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-beige/50">
              
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-espresso mb-2">
                    {coffee.name}
                  </h3>
                  <p className="text-sm text-coffee/80">{coffee.description}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="mt-16 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-coffee font-medium hover:text-espresso transition-colors group">
              
              View Full Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>);

}