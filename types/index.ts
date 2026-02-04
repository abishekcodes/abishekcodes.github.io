import { LucideIcon } from 'lucide-react';

// Skills
export interface Skill {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

// Experience
export interface TechStack {
  name: string;
  icon: string;
  variant?: string;
  custom?: boolean;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  achievements: string[];
  techStack: TechStack[];
}

// Projects
export interface Project {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  techStack: string[];
  role: string;
  status: 'production' | 'poc';
  company: string;
  liveUrl?: string;
  blogUrl?: string;
  problem: string;
  solution: string;
  impact: string[];
  highlights: string[];
  learnings: string;
  note?: string;
}

// Poems
export interface Poem {
  id: string;
  title: string;
  preview: string;
  fullContent: string;
  pubDate: string;
  link: string;
  thumbnail: string | null;
  imageCaption: string | null;
}

// Articles
export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Page Mode
export type PageMode = 'professional' | 'personal';

export interface PageModeContextType {
  mode: PageMode;
  toggleMode: () => void;
}
