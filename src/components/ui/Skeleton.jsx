export default function Skeleton({ className = '', variant = 'default' }) {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-8 w-1/2',
    circle: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full rounded-2xl'
  };

  return (
    <div className={`animate-pulse bg-gray-200 rounded ${variants[variant]} ${className}`} />
  );
}
