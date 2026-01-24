import {
  faCreditCard,
  faChartLine,
  faCogs,
  faCubes
} from '@fortawesome/free-solid-svg-icons';

const projectsData = [
  {
    id: 'api-billing-system',
    icon: faCreditCard,
    title: 'API Billing System',
    description: 'Usage-based billing system for sports data APIs with Stripe and Razorpay payment gateway integrations.',
    techStack: ['Python', 'Flask', 'DynamoDB', 'EventBridge', 'Lambda'],
    role: 'Software Developer',
    status: 'production',
    company: 'Roanuz',
    liveUrl: 'https://www.cricketapi.com/v5/package-pricing',
    problem: 'The platform needed a billing system to handle high-volume API metering with support for Indian and international payment gateways. Plan customization required manual developer intervention.',
    solution: 'Built a billing system with real-time usage metering and Stripe/Razorpay integration. Developed a self-service console for plan customization, user tracking, and revenue dashboards.',
    impact: [
      'Processes payments for thousands of API customers',
      'Handles millions of metered API calls',
      'Multi-gateway options (Stripe + Razorpay)'
    ],
    highlights: [
      'Multi-gateway payment integration',
      'Real-time usage metering',
      'Self-service business console',
      'Configurable API access controls'
    ],
    learnings: 'Learned payment processing, idempotency in financial systems, and building reliable metering at scale.'
  },
  {
    id: 'realtime-sports-editor',
    icon: faChartLine,
    title: 'Real-time Sports Editor',
    description: 'Real-time data editing platform for live sports coverage with sub-second latency.',
    techStack: ['Python', 'Kafka', 'RabbitMQ', 'Cassandra', 'DynamoDB'],
    role: 'Tech Lead (Team of 5)',
    status: 'production',
    company: 'Roanuz',
    blogUrl: 'https://www.cricketapi.com/v5/blog/ants-collaborative-sports-editor',
    problem: 'Live sports coverage required real-time data entry with multiple editors working simultaneously. The legacy system had latency issues.',
    solution: 'Led a team of 5 engineers, driving code reviews and technical mentorship. Collaborated on system design and defined backend API contracts. Coordinated infrastructure setup and migration planning with minimal downtime.',
    impact: [
      '30% faster data entry compared to legacy system',
      'Sub-second latency for live updates',
      'Supports concurrent editors'
    ],
    highlights: [
      'Event-driven architecture',
      'Sub-second latency',
      'Concurrent editing support',
      'Legacy system migration'
    ],
    learnings: 'Developed skills in mentoring engineers, business considerations for migrations, and event-driven architecture.'
  },
  {
    id: 'cicd-pipeline',
    icon: faCogs,
    title: 'CI/CD Pipeline',
    description: 'CI/CD pipeline for deploying frontend, backend, and Lambda functions with canary deployments.',
    techStack: ['AWS ECR', 'AWS ECS', 'Lambda', 'Docker', 'CDK', 'CodePipeline', 'CodeDeploy'],
    role: 'Software Developer',
    status: 'production',
    company: 'Roanuz',
    problem: 'Deployments were manual, error-prone, and caused downtime. The team needed reliable frequent deployments.',
    solution: 'Implemented CI/CD pipeline with CodePipeline, ECR, and ECS. Added canary deployments with automatic rollback.',
    impact: [
      'Zero-downtime deployments',
      'Increased deployment frequency',
      'Reduced rollback time'
    ],
    highlights: [
      'Zero-downtime deployments',
      'Canary release strategy',
      'Automated rollback',
      'Infrastructure as Code'
    ],
    learnings: 'Mastered AWS deployment services, container orchestration, and infrastructure as code.'
  },
  {
    id: 'internal-framework',
    icon: faCubes,
    title: 'Internal Framework Enhancements',
    description: 'Enhanced internal application framework with search integration and serverless orchestration.',
    techStack: ['AWS CDK', 'Elasticsearch', 'Python', 'Fargate', 'CodeArtifact'],
    role: 'Developer Advocate',
    status: 'production',
    company: 'Roanuz',
    problem: 'Internal framework lacked built-in search and message queue processing, requiring teams to implement these patterns from scratch.',
    solution: 'Integrated Elasticsearch for search capabilities, designed serverless task orchestration, and established dependency management pipelines.',
    impact: [
      'Onboarded multiple teams to adopt the framework',
      'Reduced operational overhead',
      'Streamlined cross-project integrations'
    ],
    highlights: [
      'Search integration',
      'Serverless orchestration',
      'Dependency management pipeline',
      'Cross-team framework adoption'
    ],
    learnings: 'Learned the importance of developer advocacy, documentation, and smooth onboarding for internal tools.'
  },
];

export default projectsData;
