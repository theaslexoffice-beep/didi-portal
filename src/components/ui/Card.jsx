export default function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-shadow duration-200 ${
        hover ? 'hover:shadow-md hover:border-gray-200 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
