import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative border-t border-gray-900 bg-black/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <p className="text-accent font-medium tracking-wide mb-4 text-sm">04. What's Next?</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Get In Touch</h2>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm currently open to new opportunities as a DevOps or Cloud Engineer. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <a href="mailto:kadamabhijit1706@gmail.com" className="inline-block bg-transparent text-accent border border-accent hover:bg-accent/10 font-bold py-4 px-10 rounded-md transition-all text-lg mb-16">
            Say Hello
          </a>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-gray-400">
            <a href="mailto:kadamabhijit1706@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors">
              <Mail size={20} />
              <span>kadamabhijit1706@gmail.com</span>
            </a>
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <span>+91 8379836180</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>Pune, India</span>
            </div>
          </div>

          <div className="mt-16 flex justify-center gap-8">
            <a href="https://github.com/abhijitkadam1706" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/abhijit-kadam-006505149" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin size={28} />
            </a>
          </div>

          <div className="mt-20 text-gray-600 text-sm font-mono">
            <p>Designed & Built by Abhijit Kadam</p>
            <p className="mt-1">Inspired by modern React portfolios</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
