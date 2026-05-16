import React from 'react';
import { motion } from 'framer-motion';
const products = [
{
  name: 'Espresso',
  image:
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Cappuccino',
  image:
  'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Latte',
  image:
  'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Mocha',
  image:
  'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800&auto=format&fit=crop'
},
{
  name: 'Americano',
  image:
  'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=800&auto=format&fit=crop'
}];

export function About() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              duration: 0.8
            }}>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-espresso mb-6">
              Our Story
            </h1>
            <div className="space-y-4 text-coffee/90 text-lg leading-relaxed">
              <p>
                Brew Haven started with a simple idea: that great coffee should
                be accessible, unpretentious, and crafted with genuine care.
                Founded in 2020, we transformed a quiet corner into a bustling
                hub for coffee lovers and community members alike.
              </p>
              <p>
                We believe that every cup tells a story—from the farmers who
                carefully cultivate the beans to the barista who expertly pulls
                the shot. Our space is designed to be your second living room, a
                place where ideas brew as freely as our coffee.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
            
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
              alt="Barista pouring coffee"
              className="w-full h-full object-cover" />
            
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}>
            
            <h2 className="text-3xl font-serif font-bold text-espresso mb-6">
              Our Passion
            </h2>
            <p className="text-xl text-coffee italic font-serif leading-relaxed">
              "To source ethically, roast meticulously, and brew perfectly. We
              are dedicated to elevating your daily ritual through exceptional
              quality and warm hospitality."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-espresso mb-4">
            Our Craft
          </h2>
          <p className="text-coffee">
            Explore our core espresso-based offerings.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, index) =>
          <motion.div
            key={product.name}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-md">
            
              <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent flex items-end p-4">
                <h3 className="text-cream font-serif font-medium text-lg">
                  {product.name}
                </h3>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>);

}