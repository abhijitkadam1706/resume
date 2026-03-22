import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center">
            <span className="text-accent mr-3">02.</span> Professional Experience
            <div className="h-px bg-gray-800 flex-grow ml-6 hidden sm:block"></div>
          </h2>

          <div className="relative border-l border-gray-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
            
            {/* AWS HPC Cluster Deployment */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-1 h-5 w-5 rounded-full bg-background border-2 border-accent"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Associate DevOps Engineer <span className="text-accent font-medium">@ ASCP GPUonCLOUD Pvt. Ltd.</span></h3>
                <p className="text-sm text-gray-500 mt-2 md:mt-0 whitespace-nowrap">09/2025 – Present | Pune, India</p>
              </div>
              
              <div className="mb-10 mt-6">
                <h4 className="text-sm font-bold text-gray-300 mb-4 tracking-wide uppercase">AWS HPC Cluster Deployment | AWS PCS · Terraform · CloudFormation · SLURM</h4>
                <ul className="space-y-4 text-gray-400 text-base">
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Architected and deployed a production-grade HPC cluster on AWS using AWS PCS and SLURM across 5 CloudFormation stacks, reducing manual setup time to zero.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Built a modular Terraform IaC project provisioning a Multi-AZ VPC with 6 subnets across 3 Availability Zones, NAT Gateways, and S3 VPC Endpoints.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Engineered auto-scaling compute node groups scaling from 0 to 1,000 nodes based on SLURM job-queue demand, achieving significant cost optimization.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Enforced 3-layer security architecture achieving 100% block rate on unauthorized access attempts via IMDSv2 and tight security groups.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-300 mb-4 tracking-wide uppercase">Infrastructure Automation & Server Operations | Ubuntu · Bash · Prometheus · Grafana</h4>
                <ul className="space-y-4 text-gray-400 text-base">
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Hardened production Linux server using SSH access controls and Fail2Ban, achieving 100% block rate on automated brute-force attacks within 8 minutes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Developed a config-driven Bash automation suite managing UFW firewall rules across 14 services including Prometheus, Grafana, Loki, and SSH.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Deployed Samba file server with LVM-provisioned 200 GB storage implementing RBAC principles for internal LAN/Wi-Fi.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3 mt-1 text-lg">▹</span>
                    <span>Configured full observability stack with custom dashboards and log pipelines for real-time infrastructure visibility.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
