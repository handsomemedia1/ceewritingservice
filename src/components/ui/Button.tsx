import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    // Base styles
    let baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    // Variant styles (mapping to CWDS brand colors)
    const variants = {
      primary: "bg-gradient-to-r from-gold to-gold-light text-white shadow-[0_4px_20px_var(--gold-glow)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(201,147,58,0.5)]",
      secondary: "bg-green-dark text-white hover:bg-green-dark-deep",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 hover:border-green-dark/20 hover:text-green-dark/70-light hover:-translate-y-[2px]",
      outline: "border border-green-dark/20 text-green-dark/70 hover:bg-green-dark/10/10"
    };

    // Size styles
    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-12 px-8 text-sm",
      lg: "h-14 px-10 text-base"
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button ref={ref} className={combinedClasses} {...props} />
    );
  }
);
Button.displayName = "Button";
