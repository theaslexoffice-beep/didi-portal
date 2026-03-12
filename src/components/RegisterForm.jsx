'use client';
import { useState, useRef } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function RegisterForm({ t, saveCitizen, setActiveTab }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [citizenId, setCitizenId] = useState(null);
  const [profile, setProfile] = useState({
    lat: null, lng: null, ward: '', 
    skills: [], resources: [], blood_group: ''
  });
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setCitizenId(data.citizen_id);
        setStep(2);
        alert(`Mock OTP for testing: ${data.otp}`);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
    setLoading(false);
  };
  
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone, otp: otpString })
      });
      const data = await res.json();
      if (data.success) {
        setCitizenId(data.citizen.id);
        setStep(3);
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      alert('Verification failed');
    }
    setLoading(false);
  };
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setProfile({ ...profile, lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };
  
  const toggleSkill = (skill) => {
    if (profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
    } else {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };
  
  const toggleResource = (resource) => {
    if (profile.resources.includes(resource)) {
      setProfile({ ...profile, resources: profile.resources.filter(r => r !== resource) });
    } else {
      setProfile({ ...profile, resources: [...profile.resources, resource] });
    }
  };
  
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/citizens/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: citizenId, ...profile })
      });
      const data = await res.json();
      if (data.success) {
        saveCitizen(data.citizen);
        setStep(4);
      }
    } catch (error) {
      alert('Profile update failed');
    }
    setLoading(false);
  };
  
  return (
    <section className="max-w-2xl mx-auto py-10 px-4 pb-24 md:pb-10">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
              s === step ? 'bg-terracotta-500 text-white scale-110' : s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s < step ? '✓' : s}
            </div>
          ))}
        </div>
      </div>
      
      {step === 1 && (
        <Card variant="glass" className="animate-slide-up">
          <h2 className="text-3xl font-black text-terracotta-600 mb-2 text-center">{t.register.title}</h2>
          <p className="text-gray-600 text-center mb-6">{t.register.subtitle}</p>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t.register.name}</label>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required 
                className="input-field" 
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t.register.phone}</label>
              <input 
                type="tel" 
                placeholder="10-digit mobile number" 
                value={form.phone} 
                onChange={e => setForm({...form, phone: e.target.value})} 
                required 
                pattern="[0-9]{10}"
                className="input-field" 
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t.register.email}</label>
              <input 
                type="email" 
                placeholder="your@email.com (optional)" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                className="input-field" 
              />
            </div>
            <Button type="submit" disabled={loading} variant="primary" className="w-full">
              {loading ? 'Sending OTP...' : t.register.submit}
            </Button>
          </form>
        </Card>
      )}
      
      {step === 2 && (
        <Card variant="glass" className="animate-slide-up">
          <h3 className="text-2xl font-bold text-center text-teal-600 mb-2">{t.register.verifyTitle}</h3>
          <p className="text-center text-gray-600 mb-6">Enter the 6-digit OTP sent to {form.phone}</p>
          
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => otpRefs.current[i] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !digit && i > 0) {
                      otpRefs.current[i - 1]?.focus();
                    }
                  }}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                />
              ))}
            </div>
            <Button type="submit" disabled={loading} variant="secondary" className="w-full">
              {loading ? 'Verifying...' : t.register.verify}
            </Button>
          </form>
        </Card>
      )}
      
      {step === 3 && (
        <Card variant="glass" className="animate-slide-up">
          <h3 className="text-2xl font-bold text-center text-terracotta-600 mb-6">{t.register.profileTitle}</h3>
          
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">📍 {t.register.location}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ward/Area" 
                  value={profile.ward} 
                  onChange={e => setProfile({...profile, ward: e.target.value})} 
                  className="input-field flex-1"
                />
                <button
                  type="button"
                  onClick={getLocation}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${
                    profile.lat ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {profile.lat ? '✓' : '📍'}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700 mb-3">🛠️ {t.register.skills}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(t.register.skillsList).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleSkill(key)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                      profile.skills.includes(key) 
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
              <label className="block font-semibold text-gray-700 mb-3">📦 {t.register.resources}</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(t.register.resourcesList).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleResource(key)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                      profile.resources.includes(key) 
                        ? 'bg-teal-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700 mb-2">🩸 {t.register.bloodGroup}</label>
              <select 
                value={profile.blood_group} 
                onChange={e => setProfile({...profile, blood_group: e.target.value})} 
                className="input-field cursor-pointer"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
            
            <Button type="submit" disabled={loading} variant="primary" className="w-full">
              {loading ? 'Saving...' : t.register.saveProfile}
            </Button>
          </form>
        </Card>
      )}
      
      {step === 4 && (
        <Card variant="glass" className="animate-slide-up text-center py-12">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-black text-green-600 mb-3">Welcome to DIDI!</h2>
          <p className="text-xl text-gray-700 mb-6">You're now a DIDI Hero! 🦸</p>
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black text-2xl rounded-3xl shadow-xl mb-8">
            🏅 DIDI Hero Badge
          </div>
          <p className="text-gray-600 mb-8">{t.register.success}</p>
          <Button onClick={() => setActiveTab('issues')} variant="primary">
            Start Helping →
          </Button>
        </Card>
      )}
    </section>
  );
}
