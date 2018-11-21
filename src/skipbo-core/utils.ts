export function interleaveArrays(a: any[], b: any[]) {
  assert(a.length === b.length, 'Can only interleave arrays with same length');

  const result = [];

  for (let i = 0; i < a.length; i++) {
    result.push(a[i], b[i]);
  }

  return result;
}

// Extract Keys and Values from a TS enum
export function getEnumValuesAndKeys(ENUM: any) {
  const keys = Object.keys(ENUM)
    .filter(k => typeof ENUM[k as any] === 'number')
    .filter(k => ENUM[k] !== ENUM.SkipBo);

  const values = keys.map(k => ENUM[k as any]);
  return { keys, values };
}

// yates shuffle
export function shuffle(a: any[]): any[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function assert(condition, message) {
  if (!condition) {
    message = message || 'Assertion failed';
    if (typeof Error !== 'undefined') {
      throw new Error(message);
    }
    throw message; // Fallback
  }
}
