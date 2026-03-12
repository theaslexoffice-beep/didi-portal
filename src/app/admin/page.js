'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(false);

  const auth = `Bearer ${password}`;

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin?filter=${filter}`, {
        headers: { Authorization: auth },
      });
      if (res.status === 401) { 
        setAuthed(false); 
        return; 
      }
      const data = await res.json();
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchComplaints();
  }, [authed, filter]);

  const handleAction = async (id, status) => {
    try {
      await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: auth },
        body: JSON.stringify({ id, status }),
      });
      fetchComplaints();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Login Screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-terracotta-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card variant="glass" className="max-w-sm w-full text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-black text-terracotta-600 mb-2">DIDI Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setAuthed(true)}
            placeholder="Admin Password"
            className="input-field mb-4"
          />
          <Button 
            onClick={() => setAuthed(true)} 
            variant="primary"
            className="w-full"
          >
            🚀 Login
          </Button>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 via-white to-teal-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-terracotta-600 mb-1 flex items-center gap-2">
                <span>🛡️</span> DIDI Admin Panel
              </h1>
              <p className="text-sm text-gray-500">Review and moderate citizen complaints</p>
            </div>
            <Button 
              onClick={() => { setAuthed(false); setPassword(''); }} 
              variant="ghost"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setFilter('pending')} 
            className={`px-4 py-2 text-sm rounded-full font-semibold transition ${
              filter === 'pending' 
                ? 'bg-terracotta-500 text-white shadow-md' 
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            ⏳ Pending
          </button>
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 text-sm rounded-full font-semibold transition ${
              filter === 'all' 
                ? 'bg-terracotta-500 text-white shadow-md' 
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            📋 All
          </button>
          <button 
            onClick={fetchComplaints} 
            className="px-4 py-2 text-sm bg-white border rounded-full text-gray-600 hover:bg-gray-50 font-semibold transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        ) : complaints.length === 0 ? (
          <Card className="text-center py-16">
            <div className="text-6xl mb-3">✅</div>
            <p className="text-xl font-bold text-gray-700 mb-2">All caught up!</p>
            <p className="text-gray-500">No complaints to review at the moment.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <Card key={c.id} className="hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-gray-400">#{c.id}</span>
                    <Badge variant={
                      c.status === 'pending' ? 'warning' :
                      c.status === 'approved' ? 'success' :
                      c.status === 'resolved' ? 'secondary' :
                      'danger'
                    }>
                      {c.status}
                    </Badge>
                    <Badge variant="default">{c.category}</Badge>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(c.created_at).toLocaleString('en-IN', { 
                      dateStyle: 'short', 
                      timeStyle: 'short' 
                    })}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed bg-gray-50 p-3 rounded-xl">
                  {c.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Citizen Info */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-center gap-1">
                      <span>👤</span>
                      <strong>{c.name || 'Anonymous'}</strong>
                    </p>
                    <p className="flex items-center gap-1">
                      <span>📱</span>
                      {c.whatsapp}
                    </p>
                    {c.email && (
                      <p className="flex items-center gap-1">
                        <span>📧</span>
                        {c.email}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    {c.status === 'pending' && (
                      <>
                        <Button 
                          onClick={() => handleAction(c.id, 'approved')} 
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          ✅ Approve
                        </Button>
                        <Button 
                          onClick={() => handleAction(c.id, 'rejected')} 
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          ❌ Reject
                        </Button>
                      </>
                    )}
                    {c.status === 'approved' && (
                      <Button 
                        onClick={() => handleAction(c.id, 'resolved')} 
                        variant="secondary"
                        size="sm"
                      >
                        ✅ Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
