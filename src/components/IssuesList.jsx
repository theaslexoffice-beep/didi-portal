'use client';
import { useState, useEffect } from 'react';
import IssueCard from './IssueCard';
import Skeleton from './ui/Skeleton';
import Card from './ui/Card';

export default function IssuesList({ t, citizen, setActiveTab }) {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState({ category: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  
  useEffect(() => {
    fetchIssues();
  }, [filter]);
  
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: 'open', ...filter });
      const res = await fetch(`/api/issues?${params}`);
      const data = await res.json();
      if (data.success) setIssues(data.issues || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  
  const handleHelp = async (issueId) => {
    if (!citizen) {
      alert('Please register first to offer help!');
      setActiveTab('register');
      return;
    }
    try {
      const res = await fetch(`/api/issues/${issueId}/help`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citizen_id: citizen.id, message: 'I can help!' })
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Help offer sent! The person will be notified.');
        fetchIssues();
      }
    } catch (error) {
      alert('Failed to send help offer');
    }
  };
  
  const handleUpvote = async (issueId) => {
    try {
      const res = await fetch(`/api/issues/${issueId}/upvote`, { method: 'POST' });
      const data = await res.json();
      if (data.success) fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <section className="max-w-6xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">{t.issues.title}</h2>
        <p className="text-gray-600 text-lg">{t.issues.subtitle}</p>
      </div>
      
      {/* Filters */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <select 
          value={filter.category} 
          onChange={e => setFilter({...filter, category: e.target.value})} 
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold focus:ring-2 focus:ring-terracotta-300 outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {Object.entries(t.issues.categories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select 
          value={filter.severity} 
          onChange={e => setFilter({...filter, severity: e.target.value})} 
          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold focus:ring-2 focus:ring-terracotta-300 outline-none cursor-pointer"
        >
          <option value="">All Priorities</option>
          {Object.entries(t.issues.severityLevels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      ) : issues.length === 0 ? (
        <Card className="text-center py-20">
          <p className="text-6xl mb-4">🎉</p>
          <p className="text-xl font-bold text-gray-700 mb-2">No open issues!</p>
          <p className="text-gray-500">Community is doing great.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} t={t} onHelp={handleHelp} onUpvote={handleUpvote} />
          ))}
        </div>
      )}
      
      {/* Floating Action Button */}
      <button
        onClick={() => setShowReportModal(true)}
        className="fixed bottom-24 md:bottom-8 right-4 w-16 h-16 bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-2xl z-40"
      >
        +
      </button>
    </section>
  );
}
