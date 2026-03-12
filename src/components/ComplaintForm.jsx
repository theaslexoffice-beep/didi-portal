'use client';
import { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Badge from './ui/Badge';

export default function ComplaintForm({ isOpen, onClose, onSuccess, citizen, t }) {
  const [form, setForm] = useState({ title: '', category: 'infrastructure', description: '', ward: '', lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [estimatedSeverity, setEstimatedSeverity] = useState(null);
  
  useEffect(() => {
    // Auto-estimate severity based on keywords
    const desc = form.description.toLowerCase();
    if (desc.match(/emergency|urgent|danger|death|injury|violence|fire|accident/)) {
      setEstimatedSeverity('P0');
    } else if (desc.match(/food|water|medicine|shelter|hospital|sick/)) {
      setEstimatedSeverity('P1');
    } else if (desc.match(/harassment|illegal|police|eviction|threat/)) {
      setEstimatedSeverity('P2');
    } else if (desc.match(/road|electricity|water supply|drain|pothole/)) {
      setEstimatedSeverity('P3');
    } else {
      setEstimatedSeverity('P4');
    }
  }, [form.description]);
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setForm({ ...form, lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, err => {
        alert('Location access denied. Please enter manually.');
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          citizen_id: citizen?.id,
          status: 'open'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Issue reported successfully! DIDI is finding helpers near you...');
        onSuccess();
        onClose();
        setForm({ title: '', category: 'infrastructure', description: '', ward: '', lat: null, lng: null });
      } else {
        alert('Failed to report issue. Please try again.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚨 Report Issue">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Title</label>
          <input 
            type="text" 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})}
            placeholder="Brief summary of the issue"
            className="input-field"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(t.issues.categories).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setForm({...form, category: key})}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  form.category === key 
                    ? 'bg-terracotta-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Description</label>
          <textarea 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})}
            placeholder="Describe the problem in detail..."
            rows={5}
            className="input-field resize-none"
            required
          ></textarea>
        </div>
        
        {estimatedSeverity && (
          <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Estimated Priority:</p>
            <Badge variant={estimatedSeverity.toLowerCase()}>
              {t.issues.severityLevels[estimatedSeverity]}
            </Badge>
          </div>
        )}
        
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Location</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={form.ward} 
              onChange={e => setForm({...form, ward: e.target.value})}
              placeholder="Ward/Area/Landmark"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={getLocation}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                form.lat ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              📍 {form.lat ? '✓' : 'Get'}
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Photo upload coming soon!</strong> For now, describe the issue in detail.
          </p>
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          variant="primary"
          className="w-full"
        >
          {loading ? 'Submitting...' : '🚀 Submit Issue'}
        </Button>
      </form>
    </Modal>
  );
}
