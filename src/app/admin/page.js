'use client';
import { useState, useEffect } from 'react';
import { Shield, Eye, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Skeleton from '@/components/ui/Skeleton';
import Tabs from '@/components/ui/Tabs';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, rejected: 0 });

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
      setStats(data.stats || stats);
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length > 0) {
      setAuthed(true);
    }
  };

  // Login Screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1D3557] to-[#457B9D] flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">DIDI Admin Panel</h1>
            <p className="text-gray-600">Authorized personnel only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              label="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">DIDI Admin</h1>
                <p className="text-sm text-gray-500">Complaint Management</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setAuthed(false)}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="stat-card">
            <TrendingUp className="w-8 h-8 text-gray-700 mx-auto mb-2" />
            <div className="text-3xl font-black font-mono text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm font-semibold text-gray-600">Total Issues</div>
          </Card>
          <Card className="stat-card">
            <Clock className="w-8 h-8 text-[#F77F00] mx-auto mb-2" />
            <div className="text-3xl font-black font-mono text-[#F77F00] mb-1">{stats.pending}</div>
            <div className="text-sm font-semibold text-gray-600">Pending</div>
          </Card>
          <Card className="stat-card">
            <CheckCircle className="w-8 h-8 text-[#2A9D8F] mx-auto mb-2" />
            <div className="text-3xl font-black font-mono text-[#2A9D8F] mb-1">{stats.resolved}</div>
            <div className="text-sm font-semibold text-gray-600">Resolved</div>
          </Card>
          <Card className="stat-card">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-3xl font-black font-mono text-red-600 mb-1">{stats.rejected}</div>
            <div className="text-sm font-semibold text-gray-600">Rejected</div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card className="mb-6">
          <Tabs
            tabs={[
              { id: 'pending', label: 'Pending' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'resolved', label: 'Resolved' },
              { id: 'rejected', label: 'Rejected' },
              { id: 'all', label: 'All' }
            ]}
            activeTab={filter}
            onChange={setFilter}
          />
        </Card>

        {/* Complaints List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <Card className="text-center py-16">
            <p className="text-gray-500">No complaints in this category</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="hover:border-gray-200 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left: Complaint Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Badge variant={
                        complaint.status === 'resolved' ? 'success' :
                        complaint.status === 'rejected' ? 'gray' :
                        complaint.status === 'in-progress' ? 'warning' :
                        'primary'
                      }>
                        {complaint.status}
                      </Badge>
                      <Badge variant="gray">{complaint.category}</Badge>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2">
                      {complaint.title || complaint.description?.substring(0, 80) + '...'}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {complaint.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>📍 {complaint.location}</span>
                      <span>🗺️ {complaint.ward}</span>
                      {complaint.phone && <span>📞 {complaint.phone}</span>}
                      <span>📅 {new Date(complaint.created_at).toLocaleDateString()}</span>
                    </div>

                    {complaint.photo_url && (
                      <div className="mt-3">
                        <img
                          src={complaint.photo_url}
                          alt="Issue"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex md:flex-col gap-2 md:min-w-[140px]">
                    {complaint.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleAction(complaint.id, 'in-progress')}
                          className="flex-1 md:flex-none"
                        >
                          Start Review
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleAction(complaint.id, 'rejected')}
                          className="flex-1 md:flex-none"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {complaint.status === 'in-progress' && (
                      <Button
                        size="sm"
                        onClick={() => handleAction(complaint.id, 'resolved')}
                        className="w-full"
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`/complaints/${complaint.id}`, '_blank')}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
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
