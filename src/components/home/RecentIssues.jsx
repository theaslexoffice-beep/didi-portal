'use client';
import { useEffect, useState } from 'react';
import { ChevronRight, ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';

export default function RecentIssues({ lang = 'en', onViewAll }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  const fetchRecentIssues = async () => {
    try {
      const res = await fetch('/api/complaints?limit=3&sort=recent');
      const data = await res.json();
      setIssues(data.complaints || []);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const content = {
    en: {
      title: 'Recent Issues',
      subtitle: 'See what your neighbors are reporting',
      viewAll: 'View All Issues',
      votes: 'votes',
      comments: 'comments',
      day: 'Day',
      noIssues: 'No issues reported yet. Be the first to make a difference!'
    },
    hi: {
      title: 'हालिया मुद्दे',
      subtitle: 'देखें कि आपके पड़ोसी क्या रिपोर्ट कर रहे हैं',
      viewAll: 'सभी मुद्दे देखें',
      votes: 'वोट',
      comments: 'टिप्पणियां',
      day: 'दिन',
      noIssues: 'अभी तक कोई शिकायत नहीं। बदलाव लाने वाले पहले व्यक्ति बनें!'
    }
  };

  const t = content[lang];

  const getCategoryColor = (category) => {
    const colors = {
      'Water Supply': 'primary',
      'Roads': 'warning',
      'Electricity': 'secondary',
      'Sanitation': 'success'
    };
    return colors[category] || 'gray';
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton variant="title" className="mx-auto mb-4" />
            <Skeleton variant="text" className="mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {issues.length === 0 ? (
          <div className="empty-state">
            <p className="text-xl">{t.noIssues}</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {issues.slice(0, 3).map((issue) => (
                <Card key={issue.id} hover>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={getCategoryColor(issue.category)}>
                      {issue.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{issue.ward}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {issue.title || issue.description?.substring(0, 60) + '...'}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {issue.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {issue.votes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {issue.comments || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {t.day} {issue.daysOpen || 1}
                    </span>
                  </div>
                  
                  {issue.status && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          issue.status === 'resolved' ? 'bg-[#2A9D8F]' : 
                          issue.status === 'in-progress' ? 'bg-[#F77F00]' : 
                          'bg-[#E63946]'
                        }`} />
                        {issue.status_message || `Status: ${issue.status}`}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" onClick={onViewAll}>
                {t.viewAll}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
