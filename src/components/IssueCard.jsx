'use client';
import { getSeverityColor, getSeverityPulse } from '@/lib/severity';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

export default function IssueCard({ issue, t, onHelp, onUpvote }) {
  const severityClass = getSeverityColor(issue.severity);
  const pulseClass = getSeverityPulse(issue.severity);
  
  return (
    <Card hover className="animate-fade-in">
      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <Badge variant={issue.severity?.toLowerCase()} className={pulseClass}>
            {t.issues.severityLevels[issue.severity] || issue.severity}
          </Badge>
          <Badge variant="secondary">
            {t.issues.categories[issue.category] || issue.category}
          </Badge>
        </div>
        <span className="text-xs text-gray-400">{new Date(issue.created_at).toLocaleDateString()}</span>
      </div>
      
      {issue.title && <h3 className="font-bold text-xl text-gray-800 mb-2">{issue.title}</h3>}
      <p className="text-gray-700 mb-4 leading-relaxed">{issue.description}</p>
      
      <div className="flex items-center gap-3 flex-wrap">
        <Button 
          variant="primary"
          size="sm"
          onClick={() => onHelp(issue.id)}
        >
          🤝 {t.issues.canHelp}
        </Button>
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onUpvote(issue.id)}
        >
          ⬆️ {issue.upvotes || 0}
        </Button>
        {issue.ward && <span className="text-xs text-gray-500 flex items-center gap-1"><span>📍</span>{issue.ward}</span>}
      </div>
    </Card>
  );
}
