export interface TranslationDict {
  [key: string]: string | TranslationDict;
}

const translations: Map<string, TranslationDict> = new Map();
let currentLocale = 'zh-CN';

export function setLocale(locale: string): void {
  currentLocale = locale;
}

export function getLocale(): string {
  return currentLocale;
}

export function registerTranslations(locale: string, dict: TranslationDict): void {
  translations.set(locale, dict);
}

function getNestedValue(obj: TranslationDict, path: string[]): string | undefined {
  let current: TranslationDict | string = obj;
  for (const key of path) {
    if (typeof current === 'string') return undefined;
    current = current[key];
    if (current === undefined) return undefined;
  }
  return typeof current === 'string' ? current : undefined;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const dict = translations.get(currentLocale) ?? translations.get('zh-CN');
  if (!dict) return key;

  const path = key.split('.');
  let value = getNestedValue(dict, path);

  if (value === undefined) {
    const enDict = translations.get('en');
    if (enDict) {
      value = getNestedValue(enDict, path);
    }
  }

  if (value === undefined) return key;

  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, name) => {
      const param = params[name];
      return param !== undefined ? String(param) : `{{${name}}}`;
    });
  }

  return value;
}

export function initI18n(): void {
  const savedLocale = localStorage.getItem('openx-locale');
  if (savedLocale) {
    currentLocale = savedLocale;
  } else {
    const browserLocale = navigator.language;
    if (browserLocale.startsWith('zh')) {
      currentLocale = 'zh-CN';
    } else {
      currentLocale = 'en';
    }
  }
}

export function saveLocale(locale: string): void {
  localStorage.setItem('openx-locale', locale);
  setLocale(locale);
}
