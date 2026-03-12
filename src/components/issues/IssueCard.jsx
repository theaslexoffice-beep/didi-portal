import { ThumbsUp, MessageCircle, Clock, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function IssueCard({ issue, lang = 'en', onClick }) {
  const getCategoryColor = (category) => {
    const colors = {
      'Water Supply': 'primary',
      'Roads': 'warning',
      'Electricity': 'secondary',
      'Sanitation': 'success',
      'Streetlights': 'warning',
      'Garbage': 'success',
      'Drainage': 'primary',
      'Other': 'gray'
    };
    return colors[category] || 'gray';
  };

  const getStatusDot = (status) => {
    if (status === 'resolved') return 'bg-[#2A9D8F]';
    if (status === 'in-progress') return 'bg-[#F77F00]';
    return 'bg-[#E63946]';
  };

  const content = {
    en: { day: 'Day', votes: 'votes', comments: 'comments' },
    hi: { day: 'दिन', votes: 'वोट', comments: 'टिप्पणियां' }
  };

  const t = content[lang];

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block w-2 h-2 rounded-full ${getStatusDot(issue.status)}`} />
          <Badge variant={getCategoryColor(issue.category)}>
            {issue.category}
          </Badge>
        </div>
        {issue.ward && (
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {issue.ward}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
        {issue.title || issue.description?.substring(0, 80)}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {issue.description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
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
          {t.day} {issue.daysOpen || Math.ceil((new Date() - new Date(issue.created_at)) / (1000 * 60 * 60 * 24)) || 1}
        </span>
      </div>

      {/* Status Message */}
      {issue.status_message && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusDot(issue.status)}`} />
            {issue.status_message}
          </p>
        </div>
      )}
    </Card>
  );
}
