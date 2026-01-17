'use client';

import React from 'react';

const BackgroundAnimation = () => {
    const styles = `
      .bg-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
        animation: bgFloat 20s ease-in-out infinite;
      }
      @keyframes bgFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(1deg); }
        66% { transform: translateY(10px) rotate(-1deg); }
      }
    `;

    return (
      <div className="bg-animation">
        <style>{styles}</style>
      </div>
    );
  };

export default BackgroundAnimation;