export default function Input({ 
  label, 
  error, 
  hint,
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
      <input
        className={`w-full px-4 py-3 rounded-xl border ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-[#E63946] focus:ring-[#E63946]/20'
        } bg-white focus:ring-2 focus:outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
