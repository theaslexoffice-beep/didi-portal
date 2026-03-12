'use client';
import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Skeleton from './ui/Skeleton';

export default function SchemesFinder({ t }) {
  const [form, setForm] = useState({ age: '', income: '', category: 'General', gender: 'Male', state: 'Chhattisgarh' });
  const [schemes, setSchemes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams(form);
      const res = await fetch(`/api/schemes?${params}`);
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes || []);
        setSearched(true);
      }
    } catch (error) {
      alert('Search failed');
    }
    setLoading(false);
  };
  
  return (
    <section className="max-w-5xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-teal-600 mb-2">{t.schemes.title}</h2>
        <p className="text-gray-600 text-lg">{t.schemes.subtitle}</p>
      </div>
      
      <Card variant="glass" className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔍</span>
          {t.schemes.eligibilityForm}
        </h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.schemes.age}</label>
              <input 
                type="number" 
                placeholder="e.g. 25" 
                value={form.age} 
                onChange={e => setForm({...form, age: e.target.value})} 
                className="input-field"
                min="0"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.schemes.income}</label>
              <input 
                type="number" 
                placeholder="Annual income in ₹" 
                value={form.income} 
                onChange={e => setForm({...form, income: e.target.value})} 
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.schemes.category}</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field cursor-pointer">
                <option>General</option>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="input-field cursor-pointer">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <Button type="submit" disabled={loading} variant="secondary" className="w-full">
            {loading ? 'Searching...' : `🔍 ${t.schemes.search}`}
          </Button>
        </form>
      </Card>
      
      {searched && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎁</span>
            {t.schemes.results} ({schemes.length})
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton variant="card" />
              <Skeleton variant="card" />
            </div>
          ) : schemes.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-gray-600">No schemes found matching your criteria.</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {schemes.map(scheme => (
                <Card key={scheme.id} hover>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-xl text-terracotta-600 flex-1">{scheme.name}</h4>
                    {scheme.category && (
                      <Badge variant="secondary" className="flex-shrink-0 ml-2">
                        {scheme.category === 'agriculture' && '🌾'}
                        {scheme.category === 'health' && '🏥'}
                        {scheme.category === 'education' && '📚'}
                        {scheme.category === 'housing' && '🏠'}
                        {scheme.category === 'employment' && '💼'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{scheme.description}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    {scheme.benefits && (
                      <p><strong>{t.schemes.benefits}:</strong> {scheme.benefits}</p>
                    )}
                    {scheme.ministry && (
                      <p className="text-gray-500 flex items-center gap-1">
                        <span>🏛️</span>
                        {scheme.ministry} {scheme.level && `(${scheme.level})`}
                      </p>
                    )}
                  </div>
                  {scheme.apply_url && (
                    <a 
                      href={scheme.apply_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-5 py-2 bg-teal-500 text-white font-bold rounded-full text-sm hover:bg-teal-600 transition shadow-md"
                    >
                      {t.schemes.apply} →
                    </a>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
