'use client';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

export default function ProfilePage({ t, citizen, logout, setActiveTab }) {
  if (!citizen) {
    return (
      <section className="max-w-2xl mx-auto py-20 px-4 text-center pb-24 md:pb-20">
        <Card variant="glass" className="py-16">
          <p className="text-6xl mb-4">👤</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">Please register first to view your profile</p>
          <Button variant="primary" onClick={() => setActiveTab('register')}>Register Now</Button>
        </Card>
      </section>
    );
  }
  
  return (
    <section className="max-w-4xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <Card variant="glass" className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-terracotta-500 to-teal-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
              {citizen.name?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800">{citizen.name}</h2>
              <p className="text-gray-500 text-sm">DIDI Hero Member</p>
            </div>
          </div>
          <Button onClick={logout} variant="ghost" size="sm">
            Logout
          </Button>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-terracotta-50 rounded-2xl">
            <p className="text-4xl font-black text-terracotta-600">{citizen.help_count || 0}</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">{t.profile.helpCount}</p>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-2xl">
            <p className="text-4xl font-black text-teal-600">{(citizen.trust_score || 5.0).toFixed(1)}</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">{t.profile.trustScore}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-2xl">
            <p className="text-4xl font-black text-blue-600">0</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">{t.profile.activeResponses}</p>
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <p className="flex items-center gap-2"><span>📞</span> {citizen.phone}</p>
          {citizen.email && <p className="flex items-center gap-2"><span>📧</span> {citizen.email}</p>}
          {citizen.ward && <p className="flex items-center gap-2"><span>📍</span> {citizen.ward}, {citizen.city || 'Bilaspur'}</p>}
          {citizen.blood_group && <p className="flex items-center gap-2"><span>🩸</span> {citizen.blood_group}</p>}
          
          {citizen.skills && citizen.skills.length > 0 && (
            <div className="pt-3 border-t">
              <p className="font-semibold mb-2">🛠️ Skills:</p>
              <div className="flex flex-wrap gap-2">
                {citizen.skills.map(skill => (
                  <Badge key={skill} variant="primary">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {citizen.resources && citizen.resources.length > 0 && (
            <div className="pt-3 border-t">
              <p className="font-semibold mb-2">📦 Resources:</p>
              <div className="flex flex-wrap gap-2">
                {citizen.resources.map(resource => (
                  <Badge key={resource} variant="secondary">{resource}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Badges Section */}
      <Card>
        <h3 className="text-xl font-black text-gray-800 mb-4">🏅 Your DIDI Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <div className="text-4xl mb-2">🏅</div>
            <p className="text-xs font-bold text-yellow-800">DIDI Hero</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-xs font-bold text-gray-600">Super Helper</p>
            <p className="text-[10px] text-gray-500">(10 helps needed)</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-xs font-bold text-gray-600">Quick Responder</p>
            <p className="text-[10px] text-gray-500">(5 quick responses)</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-xl border-2 border-gray-200 opacity-50">
            <div className="text-4xl mb-2">💪</div>
            <p className="text-xs font-bold text-gray-600">Community Champion</p>
            <p className="text-[10px] text-gray-500">(50 helps needed)</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
