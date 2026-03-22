import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "AWS HPC Cluster on Containers",
      date: "01/2025 – 02/2025",
      description: "Deployed a containerized HPC cluster on Rocky Linux 8.8 as a production-grade replacement for end-of-life CentOS 7.9. Provisioned multi-node compute infrastructure using Warewulf. Installed and configured SLURM Workload Manager for job scheduling and integrated Ganglia for real-time monitoring of CPU, memory, and network utilization.",
      tech: ["Rocky Linux 8.8", "Warewulf", "SLURM", "Ganglia", "Linux Cluster Admin"],
      github: "https://github.com/abhijitkadam1706/HPCSA_Project",
      featured: true
    },
    {
      title: "Jenkins CI/CD Pipeline on AWS EKS",
      date: "2026",
      description: "Built an end-to-end CI/CD pipeline using Jenkins, automating Compile → Unit Test → SonarQube code quality gate → Maven Build → Docker image build → Amazon ECR push → kubectl deploy to EKS. Provisioned a 2-AZ VPC with EKS managed node groups and installed AWS ALB Ingress Controller via Helm.",
      tech: ["Jenkins", "Docker", "Amazon EKS", "Amazon ECR", "Helm", "ALB", "SonarQube", "Prometheus"],
      github: "https://github.com/abhijitkadam1706/Ecc-Project-",
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-24 relative border-t border-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center">
            <span className="text-accent mr-3">03.</span> Featured Projects
            <div className="h-px bg-gray-800 flex-grow ml-6 hidden sm:block"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -10, backgroundColor: "#131a28" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#0d1320] border border-[#1e2637] rounded-xl overflow-hidden flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] group cursor-pointer"
              >
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-accent bg-accent/10 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                      Featured Project
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <motion.a 
                          whileHover={{ scale: 1.2, color: "#ff8d86" }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#a6abbb]"
                        >
                          <Github size={22} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#e0e5f6] mb-4 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                  <p className="text-[#a6abbb] mb-6 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </div>
                
                <div className="px-8 pb-8 pt-0">
                  <ul className="flex flex-wrap gap-2 text-xs font-mono text-[#a6abbb]">
                    {project.tech.map((tech, i) => (
                      <li key={i} className="bg-[#1e2637] px-2 py-1 rounded text-[10px] tracking-wider uppercase">{tech}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
