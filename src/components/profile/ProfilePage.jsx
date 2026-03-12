'use client';
import { useState, useEffect } from 'react';
import { User, Phone, MapPin, Award, History, Settings } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function ProfilePage({ lang = 'en', user }) {
  const [stats, setStats] = useState({ reported: 0, helped: 0, trustScore: 0 });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      setStats(data.stats);
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const content = {
    en: {
      title: 'My Profile',
      phone: 'Phone',
      ward: 'Ward',
      trustScore: 'Trust Score',
      reported: 'Issues Reported',
      helped: 'People Helped',
      activity: 'Recent Activity',
      achievements: 'Achievements',
      noActivity: 'No recent activity'
    },
    hi: {
      title: 'मेरी प्रोफ़ाइल',
      phone: 'फोन',
      ward: 'वार्ड',
      trustScore: 'विश्वास स्कोर',
      reported: 'शिकायतें दर्ज',
      helped: 'लोगों की मदद की',
      activity: 'हालिया गतिविधि',
      achievements: 'उपलब्धियां',
      noActivity: 'कोई हालिया गतिविधि नहीं'
    }
  };

  const t = content[lang];

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">{t.title}</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#E63946] to-[#D62839] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-1">{user?.name || 'User'}</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <Phone className="w-4 h-4" />
                {user?.phone ? `${user.phone.slice(0, 2)}******${user.phone.slice(-2)}` : 'Not set'}
              </div>
              {user?.ward && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {user.ward}
                </div>
              )}

              {/* Trust Score */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="trust-score mx-auto">
                  <Award className="w-5 h-5" />
                  <span>{stats.trustScore}/100</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{t.trustScore}</p>
              </div>
            </div>
          </Card>

          {/* Stats & Activity */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="stat-card">
                <div className="text-4xl font-black font-mono text-[#E63946] mb-2">{stats.reported}</div>
                <div className="text-sm font-semibold text-gray-600">{t.reported}</div>
              </Card>
              <Card className="stat-card">
                <div className="text-4xl font-black font-mono text-[#2A9D8F] mb-2">{stats.helped}</div>
                <div className="text-sm font-semibold text-gray-600">{t.helped}</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-700" />
                <h3 className="font-black text-gray-900">{t.activity}</h3>
              </div>
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">{t.noActivity}</p>
              ) : (
                <div className="space-y-3">
                  {activities.slice(0, 5).map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-[#E63946] rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Achievements */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-gray-700" />
                <h3 className="font-black text-gray-900">{t.achievements}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">🎯 First Issue</Badge>
                <Badge variant="warning">🔥 5 Day Streak</Badge>
                <Badge variant="primary">👥 Community Helper</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
