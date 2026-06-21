import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { Mic, Play, Pause, Square, RotateCcw, Settings, X, ChevronDown } from 'lucide-react';
import type { Company } from '@/lib/mock-data/stocks';

const STORAGE_KEY = 'maitra_voice_guide_enabled';
const SETTINGS_KEY = 'maitra_voice_guide_settings';

interface VoiceGuideProps {
  company: Company;
  timeframe: string;
}

export interface VoiceGuideRef {
  announce: (text: string) => void;
}

function formatCurrencyForSpeech(value: number): string {
  if (!value || isNaN(value)) return 'N/A';
  const rupees = Math.floor(value);
  const paise = Math.round((value - rupees) * 100);
  if (paise > 0) {
    return `${rupees} rupees and ${paise} paise`;
  }
  return `${rupees} rupees`;
}

function formatLargeNumber(n: number): string {
  if (n >= 1_00_00_00_00_000) return (n / 1_00_00_00_00_000).toFixed(2) + ' Lakh Crore';
  if (n >= 1_00_00_00_000) return (n / 1_00_00_00_000).toFixed(2) + ' Thousand Crore';
  if (n >= 1_00_00_000) return (n / 1_00_00_000).toFixed(2) + ' Crore';
  return n.toLocaleString('en-IN');
}

const VoiceGuide = forwardRef<VoiceGuideRef, VoiceGuideProps>(({ company, timeframe }, ref) => {
  const [hasSetPreference, setHasSetPreference] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [language, setLanguage] = useState('en-IN');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  
  const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    if (!synth) {
      setIsSupported(false);
      return;
    }

    try {
      const pref = localStorage.getItem(STORAGE_KEY);
      if (pref === null) {
        setHasSetPreference(false);
      } else {
        setIsEnabled(pref === 'true');
      }

      const settings = localStorage.getItem(SETTINGS_KEY);
      if (settings) {
        const parsed = JSON.parse(settings);
        setAutoPlay(!!parsed.autoPlay);
        setSpeechRate(parsed.speechRate || 0.95);
        setLanguage(parsed.language || 'en-IN');
      }
    } catch (e) {
      // Fallback if localStorage is inaccessible
      setHasSetPreference(true);
      setIsEnabled(false);
    }
  }, [synth]);

  const saveSettings = (newAutoPlay: boolean, newRate: number, newLang: string) => {
    setAutoPlay(newAutoPlay);
    setSpeechRate(newRate);
    setLanguage(newLang);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        autoPlay: newAutoPlay,
        speechRate: newRate,
        language: newLang
      }));
    } catch (e) {}
  };

  const handleEnable = (enable: boolean) => {
    setIsEnabled(enable);
    setHasSetPreference(true);
    try {
      localStorage.setItem(STORAGE_KEY, enable ? 'true' : 'false');
    } catch (e) {}
    if (enable && autoPlay) {
      setTimeout(() => playCompanySummary(), 500);
    }
  };

  const generateCompanySummary = () => {
    if (!company) return '';
    
    const change = company.change || 0;
    const changePct = company.changePct || 0;
    const price = company.price || 0;
    
    const movement = change >= 0 ? 'up by' : 'down by';
    const absPctChange = Math.abs(changePct);
    
    let trend = change >= 0 ? 'trading in positive territory' : 'trading in negative territory';

    return `Welcome to Maitra Wealth. You are viewing ${company.name || 'Company'}. ` +
           `The current market price is ${formatCurrencyForSpeech(price)}, ` +
           `${movement} ${absPctChange.toFixed(2)} percent today. ` +
           `The day's high is ${formatCurrencyForSpeech(company.high || 0)}, ` +
           `while the day's low is ${formatCurrencyForSpeech(company.low || 0)}. ` +
           `The fifty-two-week high is ${formatCurrencyForSpeech(company.fiftyTwoWeekHigh || 0)}. ` +
           `Overall, the stock is ${trend}.`;
  };

  const play = (text: string) => {
    if (!isEnabled || !synth) return;
    try {
      synth.cancel();
    } catch (e) {}
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.lang = language;
    
    // Voice Selection Priority for Indian English
    const voices = synth.getVoices();
    if (voices.length > 0) {
      let selectedVoice = 
        voices.find(v => v.lang === 'en-IN' && (v.name.includes('Google') || v.name.includes('Heera') || v.name.includes('Ravi'))) ||
        voices.find(v => v.lang === 'en-IN') ||
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang === 'en-US') ||
        voices[0];
        
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    
    currentUtterance.current = utterance;
    try {
      synth.speak(utterance);
    } catch (e) {}
  };

  const playCompanySummary = () => {
    play(generateCompanySummary());
  };

  useImperativeHandle(ref, () => ({
    announce: (text: string) => {
      play(text);
    }
  }));

  // Initial AutoPlay
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current && hasSetPreference && isEnabled && autoPlay) {
      initialMount.current = false;
      playCompanySummary();
    }
  }, [hasSetPreference, isEnabled, autoPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synth) {
        try {
          synth.cancel();
        } catch (e) {}
      }
    };
  }, []);

  const handlePauseResume = () => {
    if (!synth) return;
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
    } else if (isPlaying) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (!synth) return;
    try {
      synth.cancel();
    } catch (e) {}
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) return null;

  if (!hasSetPreference) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050B18]/80 backdrop-blur-md">
        <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl mx-4 transform transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center">
              <Mic className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <h2 className="text-xl font-bold text-white">AI Voice Guide</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Hear stock summaries, price movements, and important market information through spoken narration. Designed for accessibility and easier market understanding.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleEnable(true)}
              className="w-full py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold hover:bg-[#ff7a1f] transition-colors"
            >
              Enable Voice Guide
            </button>
            <button 
              onClick={() => handleEnable(false)}
              className="w-full py-2.5 rounded-xl bg-white/5 text-slate-300 font-semibold hover:bg-white/10 transition-colors"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isEnabled) return null;

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A]/60 backdrop-blur-md border border-white/5 rounded-full">
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
          <Mic className={`w-[16px] h-[16px] ${isPlaying && !isPaused ? 'text-[#FF6B00] animate-pulse' : 'text-slate-400'}`} />
          <span className="text-[12px] font-medium text-slate-300">Voice Guide</span>
        </div>
        
        <div className="flex items-center gap-0.5 pl-0.5">
          {(!isPlaying || isPaused) ? (
            <button onClick={isPaused ? handlePauseResume : playCompanySummary} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Play">
              <Play className="w-[14px] h-[14px]" />
            </button>
          ) : (
            <button onClick={handlePauseResume} className="p-1 rounded-full hover:bg-white/10 text-[#FF6B00] transition-colors" title="Pause">
              <Pause className="w-[14px] h-[14px]" />
            </button>
          )}
          
          <button onClick={handleStop} disabled={!isPlaying && !isPaused} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30" title="Stop">
            <Square className="w-[14px] h-[14px]" />
          </button>
          
          <button onClick={() => playCompanySummary()} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Replay">
            <RotateCcw className="w-[14px] h-[14px]" />
          </button>

          <button onClick={() => setShowSettings(!showSettings)} className={`p-1 rounded-full transition-colors ${showSettings ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`} title="Settings">
            <Settings className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-[#0F172A] border border-white/10 rounded-xl p-4 shadow-2xl z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-white">Voice Settings</h3>
            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Auto-play on load</label>
              <button 
                onClick={() => saveSettings(!autoPlay, speechRate, language)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoPlay ? 'bg-[#FF6B00]' : 'bg-slate-700'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${autoPlay ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 mb-1.5 block">Speech Rate</label>
              <div className="flex gap-1">
                {[0.75, 1, 1.25, 1.5].map(rate => (
                  <button
                    key={rate}
                    onClick={() => saveSettings(autoPlay, rate, language)}
                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${speechRate === rate ? 'bg-[#FF6B00] text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 mb-1.5 block">Language</label>
              <div className="relative">
                <select 
                  value={language}
                  onChange={(e) => saveSettings(autoPlay, speechRate, e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-xs text-white outline-none focus:border-[#FF6B00]"
                >
                  <option value="en-US">English</option>
                  <option value="hi-IN">Hindi (Placeholder)</option>
                  <option value="te-IN">Telugu (Placeholder)</option>
                  <option value="ta-IN">Tamil (Placeholder)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

VoiceGuide.displayName = 'VoiceGuide';

export default VoiceGuide;
