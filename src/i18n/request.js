// src/i18n/request.js
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Static payload map configuration paths matching your messages folder tree 
import en from '../messages/en.json';
import hi from '../messages/hi.json';
import mr from '../messages/mr.json';
import sa from '../messages/sa.json';
import ta from '../messages/ta.json';
import ml from '../messages/ml.json';
import te from '../messages/te.json';
import gu from '../messages/gu.json';

const messagesMap = { en, hi, mr, sa, ta, ml, te, gu };

export default getRequestConfig(async ({ requestLocale }) => {
  // 🔥 CRITICAL FIX: requestLocale is a Promise in modern Next.js environments and MUST be awaited
  const awaitedLocale = await requestLocale;
  
  let locale = awaitedLocale;

  // Enforce structural fallback mappings if the requested locale token segment is empty
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messagesMap[locale] || messagesMap.en
  };
});