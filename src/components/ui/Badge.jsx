export default function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    primary: 'bg-[#E63946]/10 text-[#E63946]',
    success: 'bg-[#2A9D8F]/10 text-[#2A9D8F]',
    warning: 'bg-[#F77F00]/10 text-[#F77F00]',
    secondary: 'bg-[#1D3557]/10 text-[#1D3557]',
    gray: 'bg-gray-100 text-gray-700'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
