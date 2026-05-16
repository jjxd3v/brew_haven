import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/orders');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-beige/50 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-espresso mb-2">
            Welcome Back
          </h1>
          <p className="text-coffee/80">Sign in to view your orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream-light border border-beige focus:outline-none focus:ring-2 focus:ring-coffee/50 transition-shadow"
              placeholder="john@example.com" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream-light border border-beige focus:outline-none focus:ring-2 focus:ring-coffee/50 transition-shadow"
              placeholder="••••••••" />
            
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 bg-espresso text-cream rounded-xl font-medium hover:bg-coffee transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
            
            {isSubmitting ?
            <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" /> :

            <>
                Sign In
                <LogIn className="w-4 h-4" />
              </>
            }
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-coffee/80">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-espresso font-semibold hover:underline">
            
            Create one
          </Link>
        </div>
      </motion.div>
    </main>);

}