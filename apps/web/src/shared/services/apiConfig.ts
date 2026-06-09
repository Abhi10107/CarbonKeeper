const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, '');

export const apiBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL ?? '');
