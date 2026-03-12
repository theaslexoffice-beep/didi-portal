import { ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

export default function SchemeCard({ scheme, lang = 'en', onClick }) {
  const getCategoryIcon = (category) => {
    const icons = {
      'education': '📚',
      'health': '🏥',
      'agriculture': '🌾',
      'women': '👩',
      'senior': '👴',
      'housing': '🏠',
      'employment': '💼',
      'livelihood': '💰',
      'sc_st_obc': '🤝',
    };
    return icons[(category || '').toLowerCase()] || '📋';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'agriculture': { en: 'Agriculture', hi: 'कृषि' },
      'education': { en: 'Education', hi: 'शिक्षा' },
      'health': { en: 'Health', hi: 'स्वास्थ्य' },
      'women': { en: 'Women', hi: 'महिलाएं' },
      'employment': { en: 'Employment', hi: 'रोजगार' },
      'housing': { en: 'Housing', hi: 'आवास' },
      'senior': { en: 'Senior Citizens', hi: 'वरिष्ठ नागरिक' },
      'sc_st_obc': { en: 'SC/ST/OBC', hi: 'अनु.जाति/जनजाति' },
      'livelihood': { en: 'Livelihood', hi: 'आजीविका' },
    };
    const l = labels[(category || '').toLowerCase()];
    return l ? (l[lang] || l.en) : category;
  };

  return (
    <Card hover onClick={onClick} className="cursor-pointer text-center group">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#E63946]/10 to-[#F77F00]/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
        {getCategoryIcon(scheme.category)}
      </div>

      {/* Scheme Name */}
      <h3 className="font-black text-gray-900 mb-2 line-clamp-2">
        {lang === 'hi' && scheme.name_hi ? scheme.name_hi : scheme.name}
      </h3>

      {/* Benefit */}
      {scheme.benefit && (
        <p className="text-lg font-bold text-[#E63946] mb-2">{scheme.benefit}</p>
      )}

      {/* Category */}
      <p className="text-sm text-gray-600 mb-4">{getCategoryLabel(scheme.category)}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {lang === 'hi' && scheme.description_hi ? scheme.description_hi : scheme.description}
      </p>

      {/* Learn More */}
      <div className="flex items-center justify-center gap-1 text-sm font-semibold text-[#E63946] group-hover:gap-2 transition-all">
        {lang === 'en' ? 'Learn More' : 'और जानें'}
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
}
