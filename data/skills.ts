import {
  faPython,
  faAws
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faUsers,
  faRobot
} from '@fortawesome/free-solid-svg-icons';
import { Skill } from '@/types';

const skillsData: Skill[] = [
  {
    id: 1,
    icon: faRobot,
    title: 'Agentic AI',
    description: 'Building production-grade AI chatbots and multi-agent systems using LangGraph, CrewAI, and FastAPI. Experienced in prompt engineering techniques and orchestrating autonomous AI workflows for enterprise solutions.'
  },
  {
    id: 2,
    icon: faAws,
    title: 'AWS Cloud Architecture',
    description: 'Extensive experience designing and implementing scalable infrastructures using EC2, S3, Lambda, ECS, and other AWS services. Achieved 99.995% uptime and 50% cost reduction.'
  },
  {
    id: 3,
    icon: faPython,
    title: 'Python Development',
    description: 'Expert in building high-performance applications, REST APIs, GraphQL APIs and data processing pipelines using Python and frameworks like Flask, Aiohttp and Ariadne. At average load, these systems handle 50,000 requests every hour.'
  },
  {
    id: 4,
    icon: faDatabase,
    title: 'Database & Data Management',
    description: 'Strong proficiency in AWS Redshift, Cassandra, DynamoDB, MySQL, and Athena for optimal data storage, retrieval, and analytics at scale. Have Implemented a system to store 13 years of cricket match data in Cassandra, Redshift and DynamoDB.',
  },
  {
    id: 5,
    icon: faUsers,
    title: 'Development Leadership',
    description: 'Skilled in leading technical teams of 5+ engineers, conducting code reviews, mentoring developers, and fostering collaborative work environments.'
  }
];

export default skillsData;