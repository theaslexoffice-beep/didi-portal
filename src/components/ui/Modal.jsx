'use client';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = ''
}) {
  if (!isOpen) return null;
  
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl shadow-2xl ${sizes[size]} w-full max-h-[90vh] overflow-y-auto ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="sticky top-0 bg-gradient-to-r from-terracotta-500 to-teal-500 text-white px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h3 className="text-2xl font-black">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-2xl hover:scale-110 transition"
            >
              &times;
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
