import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
export type ConfirmableItem = {
  name: string;
  description: string;
  price: number;
  image: string;
};
type Props = {
  item: ConfirmableItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
};
export function OrderConfirmModal({ item, isOpen, onClose, onConfirm }: Props) {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen, item]);
  if (!item) return null;
  const subtotal = item.price * quantity;
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="fixed inset-0 bg-espresso/60 backdrop-blur-sm z-[60]"
          onClick={onClose} />
        

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 100,
              scale: 0.95
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl pointer-events-auto">
            
              {/* Header */}
              <div className="relative">
                <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-cream">
                  <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover" />
                
                </div>
                <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-espresso hover:bg-white transition-colors shadow-md"
                aria-label="Close">
                
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-espresso mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-coffee/80">{item.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-bold text-espresso">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-coffee/60">per item</span>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-between py-4 border-y border-beige/60">
                  <span className="text-sm font-medium text-espresso">
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-full border border-beige flex items-center justify-center text-espresso hover:bg-cream-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity">
                    
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-espresso text-lg">
                      {quantity}
                    </span>
                    <button
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    className="w-9 h-9 rounded-full border border-beige flex items-center justify-center text-espresso hover:bg-cream-light transition-colors"
                    aria-label="Increase quantity">
                    
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-coffee">Subtotal</span>
                  <span className="text-xl font-serif font-bold text-espresso">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                  onClick={onClose}
                  className="py-3 rounded-xl border border-beige text-espresso font-medium hover:bg-cream-light transition-colors flex items-center justify-center gap-2">
                  
                    <ShoppingBag className="w-4 h-4" />
                    Keep Browsing
                  </button>
                  <button
                  onClick={() => onConfirm(quantity)}
                  className="py-3 rounded-xl bg-espresso text-cream font-medium hover:bg-coffee transition-colors flex items-center justify-center gap-2 shadow-md">
                  
                    <Check className="w-4 h-4" />
                    Confirm Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      }
    </AnimatePresence>);

}