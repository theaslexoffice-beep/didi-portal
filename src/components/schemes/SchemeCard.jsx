import { ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

export default function SchemeCard({ scheme, lang = 'en', onClick }) {
  const getCategoryIcon = (category) => {
    const icons = {
      'Education': '📚',
      'Health': '🏥',
      'Agriculture': '🌾',
      'Women': '👩',
      'Senior Citizens': '👴',
      'Housing': '🏠',
      'Employment': '💼',
      'Financial': '💰'
    };
    return icons[category] || '📋';
  };

  return (
    <Card hover onClick={onClick} className="cursor-pointer text-center group">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#E63946]/10 to-[#F77F00]/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
        {getCategoryIcon(scheme.category)}
      </div>

      {/* Scheme Name */}
      <h3 className="font-black text-gray-900 mb-2 line-clamp-2">{scheme.name}</h3>

      {/* Benefit */}
      {scheme.benefit && (
        <p className="text-lg font-bold text-[#E63946] mb-2">{scheme.benefit}</p>
      )}

      {/* Category */}
      <p className="text-sm text-gray-600 mb-4">{scheme.category}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{scheme.description}</p>

      {/* Learn More */}
      <div className="flex items-center justify-center gap-1 text-sm font-semibold text-[#E63946] group-hover:gap-2 transition-all">
        {lang === 'en' ? 'Learn More' : 'और जानें'}
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
}
