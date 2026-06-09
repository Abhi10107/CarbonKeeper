export const sanitizeActivityText = (value: string): string =>
  value.replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim();
