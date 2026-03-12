'use client';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import IssueCard from './IssueCard';
import IssueFilters from './IssueFilters';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';

export default function IssuesList({ lang = 'en', onNewIssue, onIssueClick }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    ward: 'all',
    sort: 'recent'
  });

  const categories = [
    'Water Supply',
    'Roads',
    'Electricity',
    'Sanitation',
    'Streetlights',
    'Garbage',
    'Drainage',
    'Other'
  ];

  const wards = Array.from({ length: 70 }, (_, i) => `Ward ${i + 1}`);

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.ward !== 'all') params.append('ward', filters.ward);
      params.append('sort', filters.sort);

      const res = await fetch(`/api/complaints?${params}`);
      const data = await res.json();
      setIssues(data.complaints || []);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({ category: 'all', ward: 'all', sort: 'recent' });
  };

  const content = {
    en: {
      title: 'Community Issues',
      subtitle: 'Help your community by voting and commenting on issues',
      newIssue: 'Report New Issue',
      noIssues: 'No issues match your filters. Try adjusting them.',
      loading: 'Loading issues...'
    },
    hi: {
      title: 'सामुदायिक मुद्दे',
      subtitle: 'मुद्दों पर वोट और टिप्पणी करके अपने समुदाय की मदद करें',
      newIssue: 'नई शिकायत दर्ज करें',
      noIssues: 'कोई शिकायत आपके फ़िल्टर से मेल नहीं खाती। उन्हें समायोजित करने का प्रयास करें।',
      loading: 'शिकायतें लोड हो रही हैं...'
    }
  };

  const t = content[lang];

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Filters */}
        <IssueFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          categories={categories}
          wards={wards}
          lang={lang}
        />

        {/* Issues Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : issues.length === 0 ? (
          <div className="empty-state py-20">
            <p className="text-xl text-gray-500">{t.noIssues}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                lang={lang}
                onClick={() => onIssueClick && onIssueClick(issue)}
              />
            ))}
          </div>
        )}

        {/* FAB - Report New Issue */}
        <button
          onClick={onNewIssue}
          className="fab"
          aria-label={t.newIssue}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
