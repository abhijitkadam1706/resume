import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { category: "AWS Cloud Services", items: "EC2, S3, IAM, Lambda, VPC, ELB, Route 53, EBS, SageMaker, EFS, EKS, CloudFormation, PCS" },
    { category: "Infrastructure as Code (IaC)", items: "Terraform, AWS CloudFormation" },
    { category: "Containers & Orchestration", items: "Docker, Kubernetes, Amazon EKS, Helm" },
    { category: "CI/CD & Automation", items: "Jenkins, GitHub Actions, GitOps, Ansible, Bash Scripting, SonarQube, Nexus" },
    { category: "High Performance Computing", items: "SLURM, Storage Management, AWS PCS" },
    { category: "Monitoring", items: "Ganglia, Prometheus, Grafana, Nagios, Wireshark" },
    { category: "Networking", items: "VPC, Subnets, NAT Gateway, Security Groups, OSI and TCP/IP, Routing and Switching" },
    { category: "Operating Systems", items: "Linux (Ubuntu, CentOS), Windows" }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center">
            <span className="text-accent mr-3">01.</span> About Me & Skills
            <div className="h-px bg-gray-800 flex-grow ml-6 hidden sm:block"></div>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-gray-400 space-y-6 text-lg leading-relaxed">
              <p>
                I am an Associate DevOps Engineer passionate about building secure, scalable, and cost-efficient cloud infrastructure. With a strong foundation in Linux server hardening and observability, I specialize in automating complex deployments.
              </p>
              <p>
                My expertise lies at the intersection of High Performance Computing (HPC) and modern cloud-native architectures. Whether it's provisioning a 1,000-node HPC cluster using AWS PCS or building an end-to-end CI/CD pipeline with Jenkins and Kubernetes, I focus on delivering robust and automated solutions.
              </p>
              <p>
                I hold a Post Graduate Diploma in HPC & System Administration from C-DAC Pune and am an AWS Certified Solutions Architect – Associate.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skills.slice(0, 6).map((skill, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg hover:border-accent/50 hover:bg-gray-900 transition-all shadow-sm">
                  <h3 className="text-white font-medium mb-3 text-sm tracking-wide uppercase">{skill.category}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{skill.items}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
