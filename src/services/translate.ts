/**
 * Unified Translation Service for VidyaSaathi.
 * Exposes translateText(text, targetLang, sourceLang).
 * 
 * =========================================================================================
 * BHASHINI NMT (NATURAL MACHINE TRANSLATION) INTEGRATION POINT:
 * 
 * To plug in Government of India's Bhashini API (Digital India Bhashini Division, MeitY):
 * 1. Obtain an API Key & User ID from https://bhashini.gov.in / ULCA portal.
 * 2. Set environment variable: BHASHINI_API_KEY="your_api_key_here" and BHASHINI_USER_ID="..."
 * 3. Make an authenticated POST request to:
 *    https://dhruva-api.bhashini.gov.in/services/inference/pipeline
 * 4. Payload structure:
 *    {
 *      "pipelineTasks": [
 *        {
 *          "taskType": "translation",
 *          "config": {
 *            "language": {
 *              "sourceLanguage": sourceLang || "en",
 *              "targetLanguage": targetLang // "hi", "bhili", "gon" (Gondi) when available
 *            },
 *            "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
 *          }
 *        }
 *      ],
 *      "inputData": {
 *        "input": [{ "source": text }]
 *      }
 *    }
 * 5. Extract translated text from response.pipelineResponse[0].output[0].target
 * =========================================================================================
 */

export type SupportedLanguage = 'en' | 'hi' | 'bhili';

export interface TranslationResult {
  translatedText: string;
  sourceLang: string;
  targetLang: SupportedLanguage;
  isPlaceholder: boolean;
  provider: string;
  notice?: string;
}

/**
 * Translates academic answer text.
 * Runs as a pass-through stub with clear indicator to prevent hallucinated machine translation.
 */
export async function translateText(
  text: string,
  targetLang: SupportedLanguage,
  sourceLang: string = 'en'
): Promise<TranslationResult> {
  // Simulate brief local execution
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (targetLang === 'bhili') {
    return {
      translatedText: text, // Pass-through original text
      sourceLang,
      targetLang,
      isPlaceholder: true,
      provider: 'Bhashini Stub (Bhili Corpus Review in Progress)',
      notice: 'भीली अनुवाद समीक्षाधीन है (Beta Placeholder). प्रामाणिक जनजातीय अनुवाद कॉर्पस के सत्यापन हेतु भाषिणी (Bhashini API) से जोड़ा जाएगा।',
    };
  }

  if (targetLang === 'hi') {
    return {
      translatedText: text,
      sourceLang,
      targetLang,
      isPlaceholder: true,
      provider: 'Bhashini NMT Stub (Hindi)',
      notice: 'भाषिणी (Bhashini NMT) अनुवाद प्लग-इन बिंदु तैयार है। लाइव कुंजी जोड़ने पर यह वाक्य-दर-वाक्य अनुवाद करेगा।',
    };
  }

  // English fallback
  return {
    translatedText: text,
    sourceLang,
    targetLang,
    isPlaceholder: true,
    provider: 'Pass-through Stub',
  };
}
