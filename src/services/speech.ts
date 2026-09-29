/**
 * Browser-native Web Speech API wrapper for Speech-to-Text and Text-to-Speech.
 * Provides clear extension points for Government of India's Bhashini API integration.
 */

// Typing for browser SpeechRecognition
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

/**
 * Check if speech recognition is supported in this browser.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as IWindow;
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

/**
 * Check if speech synthesis is supported.
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

/**
 * Start browser speech recognition.
 * 
 * =========================================================================
 * BHASHINI API INTEGRATION POINT:
 * When integrating Bhashini (Digital India Bhashini Division, MeitY):
 * 1. Capture microphone audio chunks via MediaRecorder API as 16kHz WAV.
 * 2. POST to https://dhruva-api.bhashini.gov.in/services/inference/pipeline
 * 3. Send pipelineConfig with serviceId: 'ai4bharat/conformer-hi' for Hindi
 *    or Gondi/Bhili pipeline models.
 * =========================================================================
 */
export function startVoiceRecognition(options: {
  language: 'hi' | 'en';
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}): { stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    options.onError('Speech recognition is not supported in this browser.');
    return null;
  }

  const win = window as unknown as IWindow;
  const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
  const recognition = new SpeechRec();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = options.language === 'hi' ? 'hi-IN' : 'en-IN';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0]?.[0]?.transcript || '';
    options.onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    options.onError(event.error || 'Voice input error');
  };

  recognition.onend = () => {
    options.onEnd();
  };

  try {
    recognition.start();
  } catch (err: any) {
    options.onError(err.message || 'Could not start microphone');
    return null;
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        // ignore already stopped
      }
    },
  };
}

/**
 * Speak text aloud using browser SpeechSynthesis.
 * 
 * =========================================================================
 * BHASHINI TTS INTEGRATION POINT:
 * For tribal dialects or natural Indian accent voices:
 * 1. POST text to Bhashini TTS pipeline:
 *    https://dhruva-api.bhashini.gov.in/services/inference/pipeline
 *    with taskType: 'tts', serviceId: 'ai4bharat/indic-tts-hi'
 * 2. Play returned base64 audio in HTMLAudioElement.
 * =========================================================================
 */
export function speakText(
  text: string,
  options: {
    language: 'hi' | 'en';
    rate?: number; // 0.8 for slow, 1.0 for normal
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) {
  if (!isSpeechSynthesisSupported()) {
    options.onError?.('Text-to-speech not supported');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown symbols from spoken text
  const cleanText = text
    .replace(/[#*`_~[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = options.language === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = options.rate || 1.0;
  utterance.pitch = 1.0;

  utterance.onstart = () => options.onStart?.();
  utterance.onend = () => options.onEnd?.();
  utterance.onerror = (err) => options.onError?.(err);

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
