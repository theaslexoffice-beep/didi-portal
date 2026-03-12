'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SchemeCard from './SchemeCard';
import Input from '../ui/Input';
import Skeleton from '../ui/Skeleton';

export default function SchemesList({ lang = 'en', onSchemeClick }) {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Education', 'Health', 'Agriculture', 'Women', 'Senior Citizens', 'Housing', 'Employment', 'Financial'];

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [searchTerm, selectedCategory, schemes]);

  const fetchSchemes = async () => {
    try {
      const res = await fetch('/api/schemes');
      const data = await res.json();
      setSchemes(data.schemes || []);
    } catch (error) {
      console.error('Failed to fetch schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSchemes(filtered);
  };

  const content = {
    en: {
      title: 'Government Schemes',
      subtitle: 'Find benefits you\'re eligible for',
      search: 'Search schemes...',
      all: 'All',
      noResults: 'No schemes match your search. Try different keywords.'
    },
    hi: {
      title: 'सरकारी योजनाएं',
      subtitle: 'जानें आप किन लाभों के पात्र हैं',
      search: 'योजनाएं खोजें...',
      all: 'सभी',
      noResults: 'कोई योजना आपकी खोज से मेल नहीं खाती। विभिन्न कीवर्ड का प्रयास करें।'
    }
  };

  const t = content[lang];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              className="input pl-12"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toLowerCase())}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.toLowerCase()
                  ? 'bg-[#E63946] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schemes Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="empty-state py-20">
            <p className="text-xl text-gray-500">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                lang={lang}
                onClick={() => onSchemeClick && onSchemeClick(scheme)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
