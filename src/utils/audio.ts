/**
 * Audio service using the browser's native Web Speech Synthesis API
 * Specifically configured for Korean ('ko-KR')
 */

export interface AudioState {
  isSupported: boolean;
  hasKoreanVoice: boolean;
  isPlaying: boolean;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function getKoreanVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  if (cachedVoices.length > 0) return cachedVoices;

  const voices = window.speechSynthesis.getVoices();
  cachedVoices = voices.filter(v => v.lang.startsWith('ko') || v.lang.includes('KR'));
  return cachedVoices;
}

// Pre-load voices if supported
if (isSpeechSynthesisSupported()) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('ko') || v.lang.includes('KR'));
  };
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakKorean(
  text: string,
  options?: {
    rate?: number; // 0.8 to 1.0
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
): boolean {
  if (!isSpeechSynthesisSupported()) {
    if (options?.onError) options.onError(new Error('Trình duyệt không hỗ trợ Web Speech API'));
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanText = text.replace(/여:|남:|\[|\]|\(|\)/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = options?.rate || 0.85; // slightly slower for language learners
    utterance.pitch = options?.pitch || 1.0;

    const koVoices = getKoreanVoices();
    if (koVoices.length > 0) {
      utterance.voice = koVoices[0];
    }

    utterance.onstart = () => {
      if (options?.onStart) options.onStart();
    };

    utterance.onend = () => {
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (options?.onError) options.onError(e);
      if (options?.onEnd) options.onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to trigger Korean speech synthesis:', err);
    if (options?.onError) options.onError(err);
    return false;
  }
}
