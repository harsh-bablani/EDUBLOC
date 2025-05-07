import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'flat' | 'raised' | 'floating';
  isHoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevation = 'raised',
  isHoverable = false,
  onClick,
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  
  // Elevation classes
  const elevationClasses = {
    flat: 'border border-neutral-200',
    raised: 'shadow-card',
    floating: 'shadow-elevated'
  };
  
  // Hover effect
  const hoverClass = isHoverable ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated' : '';
  
  // Clickable class
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <motion.div
      className={`
        ${baseClasses}
        ${elevationClasses[elevation]}
        ${hoverClass}
        ${clickableClass}
        ${className}
      `}
      onClick={onClick}
      whileHover={isHoverable ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;