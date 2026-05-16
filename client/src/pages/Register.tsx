import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      toast.success('Registration successful!', {
        description: 'Welcome to Brew Haven.'
      });
      navigate('/orders');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
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
            Create Account
          </h1>
          <p className="text-coffee/80">
            Join Brew Haven to save your favorite orders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream-light border border-beige focus:outline-none focus:ring-2 focus:ring-coffee/50 transition-shadow"
              placeholder="John Doe" />
            
          </div>

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

          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Register
                <UserPlus className="w-4 h-4" />
              </>
            }
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-coffee/80">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-espresso font-semibold hover:underline">
            
            Sign in
          </Link>
        </div>
      </motion.div>
    </main>);

}