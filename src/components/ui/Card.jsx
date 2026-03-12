export default function Card({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick,
  hover = false,
  ...props 
}) {
  const variants = {
    default: "bg-white rounded-2xl shadow-md border border-gray-100 p-6",
    glass: "bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30"
  };
  
  const hoverClass = hover ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer" : "";
  
  return (
    <div
      onClick={onClick}
      className={`${variants[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
