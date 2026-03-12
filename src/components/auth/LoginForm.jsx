'use client';
import { useState } from 'react';
import { Phone } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function LoginForm({ lang = 'en', onSuccess, onClose }) {
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      title: 'Login to DIDI',
      subtitle: 'Enter your phone number to continue',
      phoneLabel: 'Phone Number',
      otpLabel: 'Enter OTP',
      otpSent: 'OTP sent to',
      resend: 'Resend OTP',
      sendOtp: 'Send OTP',
      verify: 'Verify',
      newUser: 'New user? You\'ll be registered automatically'
    },
    hi: {
      title: 'डीडी में लॉगिन करें',
      subtitle: 'जारी रखने के लिए अपना फोन नंबर दर्ज करें',
      phoneLabel: 'फोन नंबर',
      otpLabel: 'ओटीपी दर्ज करें',
      otpSent: 'ओटीपी भेजा गया',
      resend: 'ओटीपी फिर से भेजें',
      sendOtp: 'ओटीपी भेजें',
      verify: 'सत्यापित करें',
      newUser: 'नए उपयोगकर्ता? आप स्वचालित रूप से पंजीकृत हो जाएंगे'
    }
  };

  const t = content[lang];

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (res.ok) {
        setStep(2);
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      const data = await res.json();
      if (data.success) {
        if (onSuccess) onSuccess(data.user);
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <Input
            label={t.phoneLabel}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            required
          />
          <Button
            onClick={handleSendOtp}
            disabled={loading || phone.length < 10}
            className="w-full"
          >
            {loading ? (lang === 'en' ? 'Sending...' : 'भेजा जा रहा है...') : t.sendOtp}
          </Button>
          <p className="text-xs text-center text-gray-500">{t.newUser}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            {t.otpSent} <strong>{phone}</strong>
          </p>
          <Input
            label={t.otpLabel}
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            maxLength={6}
            required
          />
          <Button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length < 6}
            className="w-full"
          >
            {loading ? (lang === 'en' ? 'Verifying...' : 'सत्यापित हो रहा है...') : t.verify}
          </Button>
          <button
            onClick={() => setStep(1)}
            className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.resend}
          </button>
        </div>
      )}
    </div>
  );
}
