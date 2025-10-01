import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, className = '', ...props }, ref) => {
      const selectId = props.id || props.name;
      
      return (
        <div className="w-full">
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
            {...props}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

Select.displayName = 'Select';
