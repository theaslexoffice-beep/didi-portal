'use client';
import { Filter, X } from 'lucide-react';

export default function IssueFilters({ 
  filters, 
  onChange, 
  onReset,
  categories = [],
  wards = [],
  lang = 'en' 
}) {
  const content = {
    en: {
      all: 'All',
      category: 'Category',
      ward: 'Ward',
      sort: 'Sort',
      reset: 'Reset Filters',
      sortOptions: {
        recent: 'Newest First',
        votes: 'Most Votes',
        comments: 'Most Discussed'
      }
    },
    hi: {
      all: 'सभी',
      category: 'श्रेणी',
      ward: 'वार्ड',
      sort: 'क्रमबद्ध करें',
      reset: 'फ़िल्टर रीसेट करें',
      sortOptions: {
        recent: 'सबसे नया पहले',
        votes: 'सबसे अधिक वोट',
        comments: 'सबसे अधिक चर्चित'
      }
    }
  };

  const t = content[lang];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Filter className="w-5 h-5" />
          {t.category} & {t.sort}
        </div>
        {(filters.category !== 'all' || filters.ward !== 'all' || filters.sort !== 'recent') && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-[#E63946] hover:text-[#D62839]"
          >
            <X className="w-4 h-4" />
            {t.reset}
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2 md:hidden">
            {t.category}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChange({ ...filters, category: 'all' })}
              className={`category-pill ${filters.category === 'all' ? 'active' : ''}`}
            >
              {t.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onChange({ ...filters, category: cat })}
                className={`category-pill ${filters.category === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ward & Sort */}
        <div className="flex gap-3 md:w-auto">
          {/* Ward Dropdown */}
          <select
            value={filters.ward}
            onChange={(e) => onChange({ ...filters, ward: e.target.value })}
            className="select flex-1 md:w-40"
          >
            <option value="all">{t.all} {t.ward}s</option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className="select flex-1 md:w-48"
          >
            <option value="recent">{t.sortOptions.recent}</option>
            <option value="votes">{t.sortOptions.votes}</option>
            <option value="comments">{t.sortOptions.comments}</option>
          </select>
        </div>
      </div>

      {/* Active Filters (Desktop) */}
      {(filters.category !== 'all' || filters.ward !== 'all' || filters.sort !== 'recent') && (
        <button
          onClick={onReset}
          className="hidden md:flex items-center gap-2 mt-4 text-sm text-[#E63946] hover:text-[#D62839] font-medium"
        >
          <X className="w-4 h-4" />
          {t.reset}
        </button>
      )}
    </div>
  );
}
