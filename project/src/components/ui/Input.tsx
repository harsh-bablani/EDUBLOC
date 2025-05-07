import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, icon, helpText, className = '', ...props }, ref) => {
    // Base classes
    const baseInputClasses = 'rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50';
    
    // Error classes
    const errorClasses = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '';
    
    // Icon classes
    const iconClasses = icon ? 'pl-10' : '';
    
    // Width class
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              ${baseInputClasses}
              ${errorClasses}
              ${iconClasses}
              ${widthClass}
              ${className}
            `}
            {...props}
          />
        </div>
        
        {helpText && !error && (
          <p className="mt-1 text-sm text-neutral-500">{helpText}</p>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;