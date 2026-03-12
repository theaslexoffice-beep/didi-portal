import { ChevronDown } from 'lucide-react';

export default function Select({ 
  label, 
  error, 
  hint,
  options = [],
  className = '', 
  required = false,
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-[#E63946]">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-4 py-3 rounded-xl border ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#E63946] focus:ring-[#E63946]/20'
          } bg-white focus:ring-2 focus:outline-none transition-all duration-200 text-gray-900 appearance-none cursor-pointer pr-10 ${className}`}
          {...props}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
