export default function Badge({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-terracotta-100 text-terracotta-700",
    secondary: "bg-teal-100 text-teal-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    p0: "bg-red-500 text-white animate-pulse-glow",
    p1: "bg-orange-500 text-white",
    p2: "bg-yellow-500 text-white",
    p3: "bg-blue-500 text-white",
    p4: "bg-gray-400 text-white"
  };
  
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
