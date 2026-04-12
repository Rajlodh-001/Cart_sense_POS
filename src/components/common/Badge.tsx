import React from 'react';

interface BadgeProps {
  text: string;
  color?: string; //  hex code like '#FF6B35'
}

const Badge: React.FC<BadgeProps> = ({ text, color = '#9CA3AF' }) => {
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide capitalize inline-block w-fit"
      style={{
        color: color,
     
        backgroundColor: `${color}1A`, 
      }}
    >
      {text}
    </span>
  );
};

export default Badge;