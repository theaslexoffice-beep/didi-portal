'use client';
import { useState } from 'react';
import { CheckCircle, Upload, X } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';

export default function ComplaintForm({ lang = 'en', onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    ward: '',
    phone: '',
    photo: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(null);

  const categories = [
    { value: 'Water Supply', label: lang === 'en' ? 'Water Supply' : 'पानी की आपूर्ति', icon: '💧' },
    { value: 'Roads', label: lang === 'en' ? 'Roads' : 'सड़कें', icon: '🛣️' },
    { value: 'Electricity', label: lang === 'en' ? 'Electricity' : 'बिजली', icon: '⚡' },
    { value: 'Sanitation', label: lang === 'en' ? 'Sanitation' : 'स्वच्छता', icon: '🧹' },
    { value: 'Streetlights', label: lang === 'en' ? 'Streetlights' : 'स्ट्रीट लाइट', icon: '💡' },
    { value: 'Garbage', label: lang === 'en' ? 'Garbage' : 'कचरा', icon: '🗑️' },
    { value: 'Drainage', label: lang === 'en' ? 'Drainage' : 'नाली', icon: '🚰' },
    { value: 'Other', label: lang === 'en' ? 'Other' : 'अन्य', icon: '📝' }
  ];

  const wards = Array.from({ length: 70 }, (_, i) => ({
    value: `Ward ${i + 1}`,
    label: `${lang === 'en' ? 'Ward' : 'वार्ड'} ${i + 1}`
  }));

  const content = {
    en: {
      title: 'Report an Issue',
      steps: ['Category', 'Details', 'Review', 'Confirm'],
      category: {
        title: 'Select Category',
        subtitle: 'What type of issue are you reporting?'
      },
      details: {
        title: 'Issue Details',
        subtitle: 'Help us understand the problem'
      },
      review: {
        title: 'Review & Submit',
        subtitle: 'Please verify your information'
      },
      success: {
        title: 'Issue Reported!',
        subtitle: 'Thank you for helping improve Bilaspur',
        tracking: 'Tracking Number'
      },
      labels: {
        description: 'Describe the issue',
        location: 'Location/Landmark',
        ward: 'Ward',
        phone: 'Phone Number (optional)',
        photo: 'Upload Photo (optional)'
      },
      buttons: {
        next: 'Next',
        back: 'Back',
        submit: 'Submit Issue',
        close: 'Close',
        track: 'Track Issue'
      }
    },
    hi: {
      title: 'शिकायत दर्ज करें',
      steps: ['श्रेणी', 'विवरण', 'समीक्षा', 'पुष्टि'],
      category: {
        title: 'श्रेणी चुनें',
        subtitle: 'आप किस प्रकार की समस्या की रिपोर्ट कर रहे हैं?'
      },
      details: {
        title: 'समस्या विवरण',
        subtitle: 'हमें समस्या समझने में मदद करें'
      },
      review: {
        title: 'समीक्षा और सबमिट करें',
        subtitle: 'कृपया अपनी जानकारी सत्यापित करें'
      },
      success: {
        title: 'शिकायत दर्ज!',
        subtitle: 'बिलासपुर को बेहतर बनाने में मदद के लिए धन्यवाद',
        tracking: 'ट्रैकिंग नंबर'
      },
      labels: {
        description: 'समस्या का वर्णन करें',
        location: 'स्थान/मील का पत्थर',
        ward: 'वार्ड',
        phone: 'फ़ोन नंबर (वैकल्पिक)',
        photo: 'फोटो अपलोड करें (वैकल्पिक)'
      },
      buttons: {
        next: 'आगे',
        back: 'पीछे',
        submit: 'शिकायत दर्ज करें',
        close: 'बंद करें',
        track: 'ट्रैक करें'
      }
    }
  };

  const t = content[lang];

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setTrackingNumber(data.trackingNumber || `DIDI${Date.now()}`);
      setStep(4);
      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div>
          <h3 className="text-xl font-black mb-2">{t.category.title}</h3>
          <p className="text-gray-600 mb-6">{t.category.subtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setFormData({ ...formData, category: cat.value });
                  setStep(2);
                }}
                className={`p-6 rounded-xl border-2 transition-all hover:border-[#E63946] hover:bg-[#E63946]/5 ${
                  formData.category === cat.value ? 'border-[#E63946] bg-[#E63946]/5' : 'border-gray-200'
                }`}
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-sm">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div>
          <h3 className="text-xl font-black mb-2">{t.details.title}</h3>
          <p className="text-gray-600 mb-6">{t.details.subtitle}</p>
          <div className="space-y-4">
            <Textarea
              label={t.labels.description}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={lang === 'en' ? 'Describe the issue in detail...' : 'समस्या का विस्तार से वर्णन करें...'}
              rows={4}
            />
            <Input
              label={t.labels.location}
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder={lang === 'en' ? 'Near XYZ School, ABC Road' : 'XYZ स्कूल के पास, ABC रोड'}
            />
            <Select
              label={t.labels.ward}
              required
              options={[{ value: '', label: lang === 'en' ? 'Select Ward' : 'वार्ड चुनें' }, ...wards]}
              value={formData.ward}
              onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
            />
            <Input
              label={t.labels.phone}
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="9876543210"
            />
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div>
          <h3 className="text-xl font-black mb-2">{t.review.title}</h3>
          <p className="text-gray-600 mb-6">{t.review.subtitle}</p>
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            <div>
              <span className="text-sm font-semibold text-gray-500">Category:</span>
              <p className="font-semibold text-gray-900">{formData.category}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Description:</span>
              <p className="text-gray-900">{formData.description}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Location:</span>
              <p className="text-gray-900">{formData.location}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Ward:</span>
              <p className="text-gray-900">{formData.ward}</p>
            </div>
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-[#2A9D8F] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-black mb-2">{t.success.title}</h3>
          <p className="text-gray-600 mb-6">{t.success.subtitle}</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <p className="text-sm font-semibold text-gray-500 mb-2">{t.success.tracking}</p>
            <p className="text-2xl font-mono font-black text-[#E63946]">{trackingNumber}</p>
          </div>
          <Button onClick={onClose}>{t.buttons.close}</Button>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {t.steps.map((label, idx) => (
              <div key={idx} className={`text-xs font-semibold ${step > idx ? 'text-[#E63946]' : 'text-gray-400'}`}>
                {label}
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex items-center justify-between gap-4">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              {t.buttons.back}
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button
              disabled={
                (step === 1 && !formData.category) ||
                (step === 2 && (!formData.description || !formData.location || !formData.ward))
              }
              onClick={() => setStep(step + 1)}
            >
              {t.buttons.next}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (lang === 'en' ? 'Submitting...' : 'सबमिट हो रहा है...') : t.buttons.submit}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
