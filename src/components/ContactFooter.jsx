import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="bg-background pt-24 pb-12 px-6 relative border-t border-white/5" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Together</h2>
          <p className="text-textSecondary text-lg mb-8 max-w-2xl mx-auto">
            Looking for a Growth Marketing Manager to scale your Web3 ecosystem? Let's connect and discuss how we can drive real impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:huynhboikim2809@gmail.com"
              className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Mail size={20} />
              huynhboikim2809@gmail.com
            </a>
            <a 
              href="tel:+84938556225"
              className="px-8 py-4 bg-surfaceHighlight text-textPrimary rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Phone size={20} />
              +84 938 556 225
            </a>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-textSecondary text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Kimmie Huynh. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-textSecondary">
            <a href="https://www.linkedin.com/in/kimmiehuynh/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://x.com/KimmieKyros" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
