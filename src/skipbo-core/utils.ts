
export function interleaveArrays(...arrays) {
  assert(arrays.length >= 2, 'Need at least two or more arrays to interleave');

  arrays.reduce((prevLength, array) => {
    if (prevLength !== -1) {
      assert(prevLength === array.length, 'Can only interleave arrays with same length');
    }

    return array.length;
  }, -1);

  const result = [];

  for (let i = 0; i < arrays[0].length; i++) {
    for(let j = 0;  j < arrays.length; j++) {
      result.push(arrays[j][i]);

    }
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
