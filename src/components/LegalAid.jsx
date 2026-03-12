'use client';
import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function LegalAid({ t }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  
  const tools = [
    { key: 'rti', icon: '📄', color: 'from-blue-400 to-blue-600', name: t.legal?.rti?.name || 'File RTI', desc: t.legal?.rti?.desc || 'Right to Information Application' },
    { key: 'cpgrams', icon: '🏛️', color: 'from-green-400 to-green-600', name: t.legal?.cpgrams?.name || 'File CPGRAMS', desc: t.legal?.cpgrams?.desc || 'Central Government Grievance' },
    { key: 'notice', icon: '⚠️', color: 'from-orange-400 to-orange-600', name: t.legal?.notice?.name || 'Legal Notice', desc: t.legal?.notice?.desc || 'Draft Legal Notice' },
    { key: 'writ', icon: '⚖️', color: 'from-red-400 to-red-600', name: t.legal?.writ?.name || 'Writ Petition', desc: t.legal?.writ?.desc || 'Constitutional Remedy' }
  ];
  
  const handleGenerate = (tool) => {
    setSelectedTool(tool);
    setTimeout(() => {
      setGeneratedDoc({
        tool: tool.key,
        title: tool.name,
        content: `This is a mock ${tool.name} document.\n\nIn production, this would be a properly formatted legal document generated based on user inputs.\n\nFor now, this is a placeholder showing the UI/UX design.`
      });
    }, 1000);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDoc.content);
    alert('✅ Copied to clipboard!');
  };
  
  const handleDownload = () => {
    const blob = new Blob([generatedDoc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedDoc.tool}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <section className="max-w-6xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black text-purple-600 mb-2">
          {t.legal?.title || 'DIDI Nyaay — Your Rights, One Click Away'}
        </h2>
        <p className="text-gray-600 text-lg">{t.legal?.subtitle || 'Legal empowerment tools for every citizen'}</p>
      </div>
      
      {!generatedDoc ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map(tool => (
            <Card 
              key={tool.key} 
              hover
              onClick={() => handleGenerate(tool)}
              className="cursor-pointer group"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="font-black text-2xl text-gray-800 mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.desc}</p>
              <button className="px-6 py-2 bg-gray-800 text-white font-bold rounded-full text-sm hover:bg-gray-900 transition">
                Generate →
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="animate-slide-up">
          <button 
            onClick={() => {setGeneratedDoc(null); setSelectedTool(null);}} 
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition"
          >
            ← Back to Tools
          </button>
          
          <Card variant="glass">
            <h3 className="text-2xl font-black text-gray-800 mb-4">{generatedDoc.title}</h3>
            
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
              {generatedDoc.content}
            </div>
            
            <div className="flex gap-3 flex-wrap mb-4">
              <Button onClick={handleCopy} variant="primary" size="sm">
                📋 {t.legal?.copy || 'Copy'}
              </Button>
              <Button onClick={handleDownload} variant="secondary" size="sm">
                ⬇️ {t.legal?.download || 'Download'}
              </Button>
              <Button onClick={() => window.print()} size="sm">
                🖨️ {t.legal?.print || 'Print'}
              </Button>
            </div>
            
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Disclaimer:</strong> {t.legal?.disclaimer || 'These are draft documents. Please consult a lawyer for legal advice.'}
              </p>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
