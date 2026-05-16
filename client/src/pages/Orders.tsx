import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, Coffee } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import type { Order } from '../types';
import * as api from '../services/api';

export function Orders() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }
    if (user) {
      api.getOrders().then(setOrders).catch(() => setOrders([]));
    }
  }, [user, isLoading, navigate]);

  const handleDelete = async (orderId: string) => {
    try {
      await api.deleteOrder(orderId);
      setOrders(orders.filter((o) => o.id !== orderId));
      toast.success('Item removed from orders');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleClearAll = async () => {
    if (!user) return;
    try {
      await api.clearOrders();
      setOrders([]);
      toast.success('All orders cleared');
    } catch {
      toast.error('Failed to clear orders');
    }
  };

  if (isLoading || !user) return <div className="min-h-screen" />;

  const totalAmount = orders.reduce(
    (sum, order) => sum + order.price * order.quantity,
    0
  );

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <motion.h1
              initial={{
                opacity: 0,
                y: -20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="text-3xl md:text-4xl font-serif font-bold text-espresso mb-2">
              
              My Orders
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.1
              }}
              className="text-coffee">
              
              Welcome back, {user.name}. Here are the items you've added.
            </motion.p>
          </div>

          {orders.length > 0 &&
          <button
            onClick={handleClearAll}
            className="text-sm text-red-700 hover:text-red-800 font-medium px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors self-start md:self-auto">
            
              Clear All Orders
            </button>
          }
        </div>

        {orders.length === 0 ?
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white rounded-3xl p-12 text-center border border-beige/50 shadow-sm">
          
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-coffee/50" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-espresso mb-3">
              No orders yet
            </h2>
            <p className="text-coffee/80 mb-8 max-w-md mx-auto">
              You haven't added any items to your orders. Browse our menu to
              discover our specialty coffees and pastries.
            </p>
            <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 bg-espresso text-cream px-6 py-3 rounded-xl font-medium hover:bg-coffee transition-colors">
            
              <Coffee className="w-5 h-5" />
              Browse Menu
            </button>
          </motion.div> :

        <div className="space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden border border-beige/50 shadow-sm">
              <ul className="divide-y divide-beige/50">
                {orders.map((order, index) =>
              <motion.li
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: index * 0.05
                }}
                key={order.id}
                className="p-4 sm:p-6 flex items-center gap-4 sm:gap-6 hover:bg-cream-light/50 transition-colors">
                
                    <img
                  src={order.image}
                  alt={order.itemName}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shrink-0" />
                
                    <div className="flex-grow min-w-0">
                      <h3 className="font-serif text-lg font-semibold text-espresso truncate">
                        {order.itemName}
                      </h3>
                      <p className="text-sm text-coffee/80 mb-1">
                        Added: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-medium text-espresso">
                        ${order.price.toFixed(2)}{' '}
                        <span className="text-coffee/60 text-sm font-normal">
                          x {order.quantity}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <p className="font-semibold text-lg text-espresso">
                        ${(order.price * order.quantity).toFixed(2)}
                      </p>
                      <button
                    onClick={() => handleDelete(order.id)}
                    className="p-2 text-coffee/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item">
                    
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.li>
              )}
              </ul>

              <div className="bg-cream p-6 border-t border-beige/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-lg text-coffee font-medium">
                  Total Amount
                </span>
                <span className="text-2xl font-serif font-bold text-espresso">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </main>);

}
