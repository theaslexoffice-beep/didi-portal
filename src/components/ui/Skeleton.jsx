export default function Skeleton({ 
  variant = 'text', 
  width = 'full', 
  height = 'auto',
  className = ''
}) {
  const variants = {
    text: "h-4 bg-gray-200 rounded",
    title: "h-8 bg-gray-200 rounded",
    card: "h-48 bg-gray-200 rounded-2xl",
    circle: "w-12 h-12 bg-gray-200 rounded-full",
    button: "h-12 bg-gray-200 rounded-full"
  };
  
  const widths = {
    full: "w-full",
    half: "w-1/2",
    third: "w-1/3",
    quarter: "w-1/4"
  };
  
  return (
    <div className={`animate-pulse ${variants[variant]} ${typeof width === 'string' ? widths[width] : ''} ${className}`} style={{ width: typeof width === 'number' ? `${width}px` : undefined, height: typeof height === 'number' ? `${height}px` : undefined }}>
    </div>
  );
}
