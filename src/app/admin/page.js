'use client';

import { useState, useEffect } from 'react';

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
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      setComplaints(data.complaints || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchComplaints();
  }, [authed, filter]);

  const handleAction = async (id, status) => {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: auth },
      body: JSON.stringify({ id, status }),
    });
    fetchComplaints();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-terracotta-600 mb-2">🔐 DIDI Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setAuthed(true)}
            placeholder="Password"
            className="w-full px-4 py-2.5 border rounded-xl text-sm mb-4 focus:ring-2 focus:ring-terracotta-200 outline-none"
          />
          <button onClick={() => setAuthed(true)} className="w-full py-2.5 bg-terracotta-500 text-white rounded-xl font-medium hover:bg-terracotta-600">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-terracotta-600">🛡️ DIDI Admin Panel</h1>
            <p className="text-sm text-gray-500">Review and moderate citizen complaints</p>
          </div>
          <button onClick={() => { setAuthed(false); setPassword(''); }} className="text-sm text-gray-500 hover:text-red-500">
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['pending', 'all'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 text-sm rounded-full ${filter === f ? 'bg-terracotta-500 text-white' : 'bg-white text-gray-600 border'}`}>
              {f === 'pending' ? '⏳ Pending' : '📋 All'}
            </button>
          ))}
          <button onClick={fetchComplaints} className="px-4 py-1.5 text-sm bg-white border rounded-full text-gray-600 hover:bg-gray-50">
            🔄 Refresh
          </button>
        </div>

        {/* Complaints */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-gray-500">No complaints to review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl border shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">#{c.id}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      c.status === 'approved' ? 'bg-green-100 text-green-700' :
                      c.status === 'resolved' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {c.status}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">{c.category}</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span>
                </div>

                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{c.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400 space-y-0.5">
                    <p>👤 {c.name || 'Anonymous'}</p>
                    <p>📱 {c.whatsapp}</p>
                    {c.email && <p>📧 {c.email}</p>}
                  </div>

                  <div className="flex gap-2">
                    {c.status === 'pending' && (
                      <>
                        <button onClick={() => handleAction(c.id, 'approved')} className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                          ✅ Approve
                        </button>
                        <button onClick={() => handleAction(c.id, 'rejected')} className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium">
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {c.status === 'approved' && (
                      <button onClick={() => handleAction(c.id, 'resolved')} className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                        ✅ Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
