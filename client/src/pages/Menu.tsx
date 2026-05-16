import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { OrderConfirmModal } from '../components/OrderConfirmModal';
import type { MenuItem } from '../types';

const categories = ['All', 'Hot Coffee', 'Cold Coffee', 'Pastries'];

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.getMenu().then(setMenuItems).catch(() => setMenuItems([]));
  }, []);

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      toast.error('Please sign in to order', {
        description: 'You need an account to add items to your orders.',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmOrder = async (quantity: number) => {
    if (!user || !selectedItem) return;
    try {
      await api.createOrder({
        itemName: selectedItem.name,
        price: selectedItem.price,
        image: selectedItem.image,
        quantity,
      });
      toast.success(`Order confirmed!`, {
        description: `${quantity} × ${selectedItem.name} — ${(selectedItem.price * quantity).toFixed(2)}`,
        icon: <Plus className="w-4 h-4" />,
        action: {
          label: 'View Orders',
          onClick: () => navigate('/orders'),
        },
      });
      setIsModalOpen(false);
      setSelectedItem(null);
    } catch {
      toast.error('Failed to add item');
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-4xl md:text-5xl font-serif font-bold text-espresso mb-4">
            Our Menu
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="text-coffee max-w-2xl mx-auto">
            Carefully crafted drinks and fresh pastries to fuel your day.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ? 'bg-espresso text-cream shadow-md' : 'bg-cream text-coffee hover:bg-beige'}`}>
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.3,
              }}
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-beige/40 flex flex-col group">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-cream-light/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-espresso">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4 flex-grow">
                  <h3 className="font-serif text-lg font-semibold text-espresso mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-coffee/80 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-2.5 bg-beige text-espresso rounded-xl font-medium text-sm hover:bg-espresso hover:text-cream transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <OrderConfirmModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
      />
    </main>
  );
}
