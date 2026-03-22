export const profile = {
  name: "Abhijit Kadam",
  role: "Associate DevOps Engineer",
  location: "Pune, India",
  email: "kadamabhijit1706@gmail.com",
  phone: "+91 8379836180",
  github: "https://github.com/abhijitkadam1706",
  linkedin: "https://linkedin.com/in/abhijit-kadam-006505149",
  availability: "Open to associate DevOps, cloud platform, and infrastructure engineering roles.",
  hero: {
    eyebrow: "AWS PCS / Terraform / Kubernetes / Observability",
    headline: ["Abhijit", "Kadam"],
    title: "Building elastic infrastructure for HPC, CI/CD, and secure cloud operations.",
    summary:
      "Associate DevOps Engineer focused on AWS PCS + SLURM, Terraform-driven platform setup, Kubernetes delivery, observability, and Linux hardening for production systems.",
    proofPoints: [
      {
        value: "0 -> 1000",
        label: "Node scaling",
        detail: "Queue-driven AWS PCS capacity.",
      },
      {
        value: "Multi-AZ",
        label: "Infrastructure",
        detail: "Terraform VPC with six subnets.",
      },
      {
        value: "24/7",
        label: "Visibility",
        detail: "Prometheus, Grafana, and Loki.",
      },
    ],
    signals: [
      "AWS PCS and SLURM cluster orchestration",
      "Terraform, CloudFormation, and Kubernetes delivery",
      "Linux security hardening with observability-first operations",
    ],
  },
  about: {
    lead:
      "My work sits at the point where high-performance computing, cloud automation, and operations discipline overlap. I build infrastructure that is meant to scale under real workload pressure, stay observable, and remain secure by default.",
    detail:
      "The strongest through-line in my resume is operational trust: provisioning repeatable environments, automating delivery, hardening access paths, and giving teams enough telemetry to act before systems drift.",
    credentials: [
      "Post Graduate Diploma in HPC & System Administration, C-DAC Pune",
      "AWS Certified Solutions Architect - Associate",
    ],
  },
};

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Capabilities", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Case Studies", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const capabilityGroups = [
  {
    title: "Cloud Platform Engineering",
    summary: "Provisioning AWS foundations for resilient workload placement and secure connectivity.",
    items: ["AWS PCS", "EC2", "VPC", "IAM", "Route 53", "S3", "EKS", "EFS", "CloudFormation"],
  },
  {
    title: "Infrastructure as Code",
    summary: "Treating infrastructure changes as controlled releases rather than manual setup work.",
    items: ["Terraform", "CloudFormation", "Modular networking", "Reusable stacks", "Environment bootstrapping"],
  },
  {
    title: "Containers and Delivery",
    summary: "Shipping workloads through build, validation, image publication, and cluster deployment.",
    items: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Helm", "Amazon ECR", "ALB"],
  },
  {
    title: "Observability and Operations",
    summary: "Giving systems enough context to detect, explain, and respond to runtime change.",
    items: ["Prometheus", "Grafana", "Loki", "Ganglia", "Nagios", "Log pipelines", "Runbook-driven ops"],
  },
  {
    title: "Security and Linux",
    summary: "Hardening the operating layer so platform automation is fast without being loose.",
    items: ["Ubuntu", "Rocky Linux", "SSH controls", "Fail2Ban", "UFW", "RBAC", "Storage management"],
  },
];

export const experienceEntries = [
  {
    company: "ASCP GPUonCLOUD Pvt. Ltd.",
    role: "Associate DevOps Engineer",
    period: "Sep 2025 - Present",
    location: "Pune, India",
    impactMetrics: [
      { value: "5", label: "CloudFormation stacks" },
      { value: "6", label: "VPC subnets across 3 AZs" },
      { value: "1000", label: "Max cluster nodes" },
      { value: "14", label: "Services behind managed firewall rules" },
    ],
    tracks: [
      {
        title: "Elastic HPC platform delivery",
        stack: "AWS PCS / SLURM / Terraform / CloudFormation",
        bullets: [
          "Architected a production-ready AWS PCS + SLURM platform across multiple infrastructure stacks to remove manual cluster setup.",
          "Built modular Terraform for multi-AZ networking, NAT, routing, and service endpoints to support queue-based compute growth.",
          "Engineered queue-driven compute node scaling from 0 to 1000 nodes to align spend with active HPC demand.",
        ],
      },
      {
        title: "Secure operations and observability",
        stack: "Ubuntu / Bash / Prometheus / Grafana / Loki / UFW / Fail2Ban",
        bullets: [
          "Hardened Linux access paths with SSH controls and Fail2Ban to block automated brute-force attempts quickly and consistently.",
          "Developed config-driven firewall automation for internal platform services including Prometheus, Grafana, Loki, and SSH.",
          "Configured dashboards and log pipelines that gave production teams live infrastructure visibility instead of delayed troubleshooting.",
        ],
      },
    ],
  },
];

export const projectStudies = [
  {
    title: "Elastic HPC Cluster on AWS PCS",
    kind: "Workstream",
    period: "2025 - 2026",
    summary:
      "A cloud-native HPC environment designed for scheduler-driven growth, repeatable networking, and operator visibility.",
    outcomes: [
      "Scaled compute capacity from 0 -> 1000 nodes based on SLURM queue demand.",
      "Distributed infrastructure responsibility between Terraform networking and CloudFormation-managed service layers.",
      "Focused on operational cost control by provisioning only when jobs needed the fleet.",
    ],
    architecture: [
      "AWS PCS control plane and SLURM scheduling",
      "Terraform-managed VPC with six subnets across three AZs",
      "Security groups, endpoints, and layered network boundaries",
      "Observability hooks for live cluster health",
    ],
    stack: ["AWS PCS", "SLURM", "Terraform", "CloudFormation", "VPC", "Autoscaling"],
    link: null,
  },
  {
    title: "Jenkins CI/CD Pipeline on Amazon EKS",
    kind: "Project",
    period: "2026",
    summary:
      "An end-to-end delivery path that moved source changes from validation to image publication and Kubernetes deployment.",
    outcomes: [
      "Automated compile, test, code quality scanning, image build, and EKS deployment in one release path.",
      "Provisioned supporting AWS networking and ingress foundations for a production-like Kubernetes environment.",
      "Connected the pipeline to registry, cluster, and monitoring concerns instead of treating deployment as the final step.",
    ],
    architecture: [
      "Jenkins pipeline orchestration",
      "SonarQube validation and Maven build stages",
      "Docker build and Amazon ECR publication",
      "kubectl deployment to Amazon EKS with ALB ingress",
    ],
    stack: ["Jenkins", "Docker", "Amazon EKS", "Amazon ECR", "Helm", "ALB", "SonarQube"],
    link: "https://github.com/abhijitkadam1706/Ecc-Project-",
  },
  {
    title: "Containerized HPC Cluster on Rocky Linux",
    kind: "Project",
    period: "2025",
    summary:
      "A container-oriented HPC environment built as a modern replacement path for legacy CentOS-based cluster operations.",
    outcomes: [
      "Provisioned multi-node compute infrastructure for HPC experimentation and scheduler-driven execution.",
      "Integrated SLURM for workload scheduling and Ganglia for cluster telemetry.",
      "Used the project to validate platform migration away from end-of-life operating system assumptions.",
    ],
    architecture: [
      "Rocky Linux 8.8 base image and cluster nodes",
      "Warewulf provisioning workflow",
      "SLURM queue scheduling",
      "Ganglia monitoring for CPU, memory, and network visibility",
    ],
    stack: ["Rocky Linux", "Warewulf", "SLURM", "Ganglia", "Linux cluster administration"],
    link: "https://github.com/abhijitkadam1706/HPCSA_Project",
  },
];

export const terminalScenarios = [
  {
    command: "terraform apply -var-file=prod-hpc.tfvars",
    output: [
      "module.network.aws_vpc.main: Modifying... [id=vpc-prod-hpc]",
      "module.compute.aws_pcs_cluster.main: Creation complete after 3m 18s",
      "module.observability.aws_security_group.metrics: Refresh complete",
      "Apply complete! Resources: 19 added, 6 changed, 0 destroyed.",
    ],
  },
  {
    command: "scontrol show nodes | head -n 5",
    output: [
      "NodeName=cpu-queue-[001-256] State=IDLE Partitions=cpu-queue",
      "NodeName=gpu-queue-[001-032] State=ALLOCATED Partitions=gpu-queue",
      "NodeName=head-01 State=MIXED Partitions=control",
      "Jobs streaming from queue demand into autoscaling policies.",
    ],
  },
  {
    command: "kubectl rollout status deploy/platform-api -n prod",
    output: [
      "Waiting for deployment \"platform-api\" rollout to finish: 2 of 3 updated replicas are available...",
      "deployment \"platform-api\" successfully rolled out",
      "Prometheus alert state: healthy",
    ],
  },
  {
    command: "sudo fail2ban-client status sshd",
    output: [
      "Status for the jail: sshd",
      "|- Filter   | Currently failed: 0 | Total failed: 17",
      "`- Actions  | Currently banned: 3 | Total banned: 11",
    ],
  },
];

export const telemetryConfig = {
  initialMetrics: {
    cpu: 42,
    memory: 68,
    requests: 1280,
    network: 460,
  },
  logMessages: [
    "SLURM queue depth crossed the autoscale threshold.",
    "Terraform state refresh completed for the production VPC.",
    "Grafana dashboard sync finished with fresh Loki logs.",
    "Jenkins released a new container image to Amazon ECR.",
    "Fail2Ban banned a repeated SSH source after rate spike.",
    "Prometheus scrape succeeded for control-plane metrics.",
    "GPU partition accepted a new training batch request.",
  ],
};

export const pipelineStages = [
  { id: "source", label: "Source" },
  { id: "validate", label: "Validate" },
  { id: "build", label: "Build" },
  { id: "scan", label: "Scan" },
  { id: "deploy", label: "Deploy" },
  { id: "observe", label: "Observe" },
];

export const bootSequence = [
  "Initializing DevOps control plane...",
  "Loading Terraform state snapshots...",
  "Mounting observability modules...",
  "Negotiating AWS PCS cluster capacity...",
  "Verifying Kubernetes rollout health...",
  "Platform ready. Entering operations view.",
];

export const clusterProfile = {
  totalNodes: 40,
  targetScale: 1000,
  cpuShare: 0.72,
  gpuShare: 0.18,
};
