import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass-light' | 'glass-dark' | 'solid';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'glass-light', ...props }, ref) => {
    
    const variants = {
      'glass-light': "bg-white/85 backdrop-blur-[20px] border border-[rgba(201,147,58,0.12)] rounded-[20px] shadow-[var(--clay-shadow)] hover:-translate-y-[4px] hover:shadow-[0_20px_50px_rgba(201,147,58,0.15),var(--clay-shadow)] hover:border-green-dark/20 transition-all duration-400",
      'glass-dark': "bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[20px] hover:border-[rgba(201,147,58,0.25)] hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_30px_var(--gold-glow)] transition-all duration-400",
      'solid': "bg-white rounded-[20px] border border-gray-100 shadow-sm"
    };

    const combinedClasses = `${variants[variant]} ${className}`;

    return <div ref={ref} className={combinedClasses} {...props} />;
  }
);
Card.displayName = "Card";
