import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard,
  faChartLine,
  faDatabase,
  faCogs,
  faRobot
} from '@fortawesome/free-solid-svg-icons';

const projectsData = [
  {
    id: 1,
    icon: faCreditCard,
    title: 'API Billing System',
    description: 'Comprehensive usage-based billing system for sports data APIs, integrating Stripe and Razorpay payment gateways using AWS APIGateway and EventBridge',
    techStack: ['Python', 'Flask', 'DocumentDB', 'Memcached', 'APIGateway', 'EventBridge'],
    myContribution: 90,
  },
  {
    id: 2,
    icon: faChartLine,
    title: 'Real-time Sports Editor',
    description: 'Cross-functional team delivered a real-time cricket editing platform containing of GraphQL and RestAPIs for entering and processing live match data with sub-second latency, improving efficiency over the old system by 40%.',
    techStack: ['Apache Kafka', 'RabbitMQ', 'Python', 'Aiohttp', 'Ariadne', 'DynamoDB', 'Cassandra'],
    myContribution: 40,
  },
  {
    id: 3,
    icon: faDatabase,
    title: 'Data Processing Pipeline',
    description: 'Novel data distribution system serving analytics via CSV and Parquet formats, enabling seamless AI model integration and reducing costs by 25%.',
    techStack: ['AWS CDK', 'PyArrow', 'RabbitMQ', 'AWS Athena', 'AWS ECS'],
    myContribution: 100,
  },
  {
    id: 4,
    icon: faCogs,
    title: 'CI/CD Pipeline',
    description: 'A CI/CD pipeline containing stacks for deploying cricketapi.com frontend and backend applications using AWS CodePipeline, CodeBuild, and CodeDeploy, ensuring canary deployments and zero downtime',
    techStack: [ 'AWS ECR', 'AWS ECS', 'Docker', 'AWS CDK', ],
    myContribution: 70,
  },
  {
    id: 5,
    icon: faRobot,
    title: 'Gen-AI Chatbot',
    description: 'A Gen-AI chatbot for sports data, leveraging OpenAI, Pinecone vector database for semantic search, and AWS services for data retrieval and processing.',
    techStack: ['OpenAI', 'Pinecone', 'AWS EC2'],
    myContribution: 20,
  },
];

export default projectsData;