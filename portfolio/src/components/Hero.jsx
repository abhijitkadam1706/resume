import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 bg-transparent">
      {/* UI Layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col justify-center relative mt-12 lg:mt-0 max-w-2xl"
          >
            <div className="absolute -inset-8 bg-[#131a28]/40 backdrop-blur-xl border border-[#424855]/20 rounded-2xl -z-10 shadow-[0_0_40px_rgba(255,141,134,0.03)] hidden md:block" />
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#ff8d86] inline-block"></span>
              <span className="text-[#ff8d86] font-medium tracking-widest text-xs uppercase">System Active // Status: Ready</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl font-bold text-[#e0e5f6] mb-4 tracking-tighter leading-[1.1]">
                Engineering <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#707584]">Scalable Cloud</span><br/>
                Infrastructure.
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[#a6abbb] text-lg md:text-xl my-6 leading-relaxed font-sans">
              I'm <span className="text-white font-medium">Abhijit Kadam</span>, an Associate DevOps Engineer focused on building robust, automated pipelines and high-performance clusters leveraging <strong>AWS</strong>, <strong>Terraform</strong>, and <strong>Kubernetes</strong>.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mt-4">
              <motion.a 
                href="#projects" 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative bg-[#ff8d86] text-[#65000a] font-bold px-8 py-3.5 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(255,141,134,0.3)] flex items-center justify-center"
              >
                <span className="relative z-10">Deploy Projects</span>
              </motion.a>
              <motion.a 
                href="#contact" 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="border border-[#424855] text-white font-medium px-8 py-3.5 rounded-sm flex items-center justify-center hover:bg-[#131a28] hover:border-[#707584]"
              >
                Initialize Contact
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
