export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  type = 'button',
  onClick,
  ...props 
}) {
  const baseClass = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'px-6 py-3 bg-[#E63946] text-white hover:bg-[#D62839] focus:ring-2 focus:ring-[#E63946]/50',
    secondary: 'px-6 py-3 bg-[#1D3557] text-white hover:bg-[#152A45] focus:ring-2 focus:ring-[#1D3557]/50',
    ghost: 'px-6 py-3 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300/50',
    danger: 'px-6 py-3 bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500/50',
    outline: 'px-6 py-3 border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946]/5'
  };
  
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: '',
    lg: 'text-lg px-8 py-4'
  };
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
