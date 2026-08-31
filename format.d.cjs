/**
 * Encodes a non-negative integer as a string using `alphabet` as the digit
 * set (so base = alphabet.length). If `maxValue` is given, left-pads the
 * result with `alphabet[0]` so every encoding of a value in [0, maxValue]
 * comes out the same length.
 */
export function encode (value: number, alphabet: string, maxValue?: number): string

/**
 * Decodes a string produced by `encode` (or any string over `alphabet`)
 * back into an integer. Characters not in `alphabet` are skipped unless
 * `throwIfUnrecognized` is true, in which case decoding throws.
 */
export function decode (value: string, alphabet: string, throwIfUnrecognized?: boolean): number
