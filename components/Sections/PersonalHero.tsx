'use client';

import React, { CSSProperties } from 'react';
import {
  Feather,
  PenTool,
  BookOpen,
  Heart,
  Star,
  Moon,
  Quote,
  Music,
  Palette,
  Leaf,
  Sun,
  Cloud,
  LucideIcon
} from 'lucide-react';

interface FloatingIcon {
  icon: LucideIcon;
  color: string;
}

const PersonalHero = () => {
  const floatingIcons: FloatingIcon[] = [
    // Row 1
    { icon: Feather, color: "#E91E63" },
    { icon: PenTool, color: "#9C27B0" },
    { icon: BookOpen, color: "#3F51B5" },
    // Row 2
    { icon: Heart, color: "#F44336" },
    { icon: Star, color: "#FFC107" },
    { icon: Moon, color: "#607D8B" },
    { icon: Quote, color: "#00BCD4" },
    // Row 3
    { icon: Music, color: "#4CAF50" },
    { icon: Palette, color: "#FF5722" },
    { icon: Leaf, color: "#8BC34A" },
    { icon: Feather, color: "#9C27B0" },
    // Row 4
    { icon: Sun, color: "#FF9800" },
    { icon: Cloud, color: "#03A9F4" },
    { icon: Heart, color: "#E91E63" },
    { icon: PenTool, color: "#673AB7" },
    { icon: BookOpen, color: "#009688" },
    // Row 5
    { icon: Star, color: "#FFEB3B" },
    { icon: Moon, color: "#3F51B5" },
    { icon: Quote, color: "#795548" },
    { icon: Music, color: "#FF4081" },
    // Additional scattered
    { icon: Palette, color: "#7C4DFF" },
    { icon: Leaf, color: "#4CAF50" },
    { icon: Feather, color: "#F44336" },
    { icon: Sun, color: "#FFC107" },
    { icon: Cloud, color: "#00BCD4" },
    { icon: Heart, color: "#E91E63" },
    { icon: Star, color: "#9C27B0" },
    { icon: PenTool, color: "#3F51B5" }
  ];

  return (
    <section id="home" className="hero-enhanced personal-hero">
      <div className="floating-icons">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="floating-icon"
              style={{
                animationDelay: `${index * 0.5}s`,
                '--icon-color': item.color
              } as CSSProperties}
            >
              <IconComponent size={24} />
            </div>
          );
        })}
      </div>

      <div className="hero-container">
        <div className="hero-main personal-main">
          <div className="hero-greeting">
            <span className="wave">&#10024;</span> Welcome to
          </div>

          <h1 className="hero-name-large">
            <span className="first-name">My Personal</span>
            <span className="last-name">Space</span>
          </h1>

          <p className="personal-tagline">
            Where code meets creativity and thoughts become poetry
            <Feather size={18} className="inline-icon" />
          </p>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </section>
  );
};

export default PersonalHero;
